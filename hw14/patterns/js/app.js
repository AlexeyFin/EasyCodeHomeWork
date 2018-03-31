// Global Variables

// let items = JSON.parse(localStorage.getItem('items')) || [];
let table = document.getElementById('itmsList');
let formForAdd = document.forms.addNew;
let itemName = formForAdd.itemName;
let itemPrice = formForAdd.itemPrice;
let upDownSortBtn = document.getElementById('upDownSort');
let sortBtn = document.getElementById('sortBtn');
let minPrice = document.getElementById('minPrice');
let maxPrice = document.getElementById('maxPrice');
let alertDiv = document.getElementById('alertDiv');


// Observer
class EventObserver {
    constructor () {
        this.observers = []
    }

    subscribe (fn) {
        this.observers.push(fn)
    }

    unsubscribe (fn) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }

    broadcast (data) {
        this.observers.forEach(subscriber => subscriber(data))
    }
}
// не знаю правильно ли я применил observer в данном случае, как я понимаю observer это привязка "один ко многим",
// а тут у меня получилось "иголочка в яиче, яичко в уточке, уточка в зайчике....",
// добавил функцию consoleLogInfo() чтобы хоть как-то поиграться с observer-ом



// Module

const ItemsModule = (function () {

    let items = JSON.parse(localStorage.getItem('items')) || [];
    let flag = true;
    const observer = new EventObserver();
    observer.subscribe(showAlert);
    observer.subscribe(consoleLogInfo);

    function init() {
        generateList(items);
    }

    function clearList() {
        table.innerHTML = '';
    }

    function getTemplate(item) {
        let template = `<tr data-id=${item.id}>
            <td>
               <span class="nameSpan">${item.name}</span>
            </td>
            <td>
                <span class="priceSpan">${item.price}</span>
            </td>
            <td>
                <i class="fas fa-edit edit-itm"></i>
            </td>
            <td>
                <i class="fas fa-trash"></i>
            </td>
        
        </tr>
         `;

        return template;
    }

    function generateId() {
        let words = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        let id = '';
        for (let i = 0; i <= 15; i++){
            let position = Math.floor(Math.random() * words.length);
            id += words[position];


        }
        return id
    }

    function generateList(data) {
        clearList();
        data.forEach((item) =>{
          let template = getTemplate(item);
          table.insertAdjacentHTML('afterbegin', template);
        })
        setDefaultMaxPrice()
    }

    function createItem(data) {
        let item = {
            id: generateId(),
            name: data.name,
            price: data.price
        };

        return item
    }

    function addItemToList(data) {
        items.unshift(data);
        let template = getTemplate(data);
        table.insertAdjacentHTML('afterbegin', template);
        localStorage.setItem('items', JSON.stringify(items));
        setDefaultMaxPrice();
        observer.broadcast({
            cssClass: 'alert-success',
            timeout: 2500,
            text: 'Item added successfully'
        })
    }

    function deleteItem(trash) {
        let parent = trash.closest('tr');
        let itemId = parent.dataset['id'];

        let data = items.filter((item) =>{
            return item.id !== itemId;
        });
        localStorage.setItem('items', JSON.stringify(data));
        parent.remove();
        setDefaultMaxPrice();
        observer.broadcast({
            cssClass: 'alert-danger',
            timeout: 2500,
            text: 'Item has been deleted'
        })
    }

    function editItem(data) {
        for( let i = 0; i < items.length; i++){
            if (data.id === items[i].id){
                items.splice(i, 1, data);
                break
            }
        }
        localStorage.setItem('items', JSON.stringify(items));
        setDefaultMaxPrice();
    }

    function changeItem(change) {
        let parent = change.closest('tr');
        let itemId = parent.dataset['id'];
        let nameSpan = parent.querySelector('.nameSpan');
        let priceSpan = parent.querySelector('.priceSpan');

        change.classList.toggle('fa-save');

        if (change.classList.contains('fa-save')){
            nameSpan.setAttribute('contenteditable', true);
            priceSpan.setAttribute('contenteditable', true);
            nameSpan.focus();
        }else {
            nameSpan.setAttribute('contenteditable', false);
            priceSpan.setAttribute('contenteditable', false);
            editItem({
                id: itemId,
                name: nameSpan.textContent,
                price: priceSpan.textContent
            });
            observer.broadcast({
                cssClass: 'alert-info',
                timeout: 2500,
                text: 'Item has been changed'
            })
        }
    }

    function upDownSort() {
        items.sort(function (prev, next) {
            return prev.price - next.price
        });

        if(flag) {
            flag = !flag;
            generateList(items)
        } else if(!flag) {
            flag = !flag;
            generateList(items.reverse())
        }
    }

    function setDefaultMaxPrice() {
        items.sort(function (prev, next) {
            return prev.price - next.price
        });

        let maximum = items[items.length - 1].price || 0;
        maxPrice.setAttribute('placeholder', maximum);

        return maximum
    }

    function sorting() {
        let min = +minPrice.value || 0;
        let max = +maxPrice.value || setDefaultMaxPrice();
        let newItemsList = [];

        for (let i = 0; i < items.length; i++){
            if (items[i].price < min || items[i].price > max) continue;

            newItemsList.unshift(items[i])
        }

        generateList(newItemsList);
    }

    function showAlert(settings) {
        alertDiv.classList.toggle('d-none');
        alertDiv.classList.add(settings.cssClass);
        alertDiv.textContent = settings.text;

        setTimeout(function () {
            alertDiv.classList.toggle('d-none');
            alertDiv.classList.toggle(settings.cssClass)
        }, settings.timeout)
    }

    function consoleLogInfo(data) {
        console.log(data.text)
    }

    return{
        init,
        createItem,
        addItemToList,
        deleteItem,
        changeItem,
        upDownSort,
        sorting
    }

})();

ItemsModule.init();

//Events

//Adding item to list
formForAdd.addEventListener('submit',(e) =>{
    e.preventDefault();
    if (!itemName.value || !itemPrice.value) {
        console.log("Enter some data, please");
    } else {
        let data = ItemsModule.createItem({
            name: itemName.value,
            price: itemPrice.value
        });
        ItemsModule.addItemToList(data);
    }
    formForAdd.reset();
});

// Delete and change Item

table.addEventListener('click', (e) => {

    if (e.target.classList.contains('fa-trash')) {
        ItemsModule.deleteItem(e.target);
    } else if (e.target.classList.contains('edit-itm')){
        ItemsModule.changeItem(e.target);
    }
});

// sorting

upDownSortBtn.addEventListener('click', (e) => {
    ItemsModule.upDownSort();
});

sortBtn.addEventListener('click', (e) => {
    ItemsModule.sorting();
});