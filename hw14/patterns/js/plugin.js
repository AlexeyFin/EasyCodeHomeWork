
let items = JSON.parse(localStorage.getItem('items')) || [];
let table = document.getElementById('itmsList');
let formForAdd = document.forms.addNew;
let itemName = formForAdd.itemName;
let itemPrice = formForAdd.itemPrice;
let sortBtn = document.getElementById('sortBtn');
let alertDiv = document.getElementById('alertDiv');
let upDownSortBtn = document.getElementById('upDownSort');
let minPrice = document.getElementById('minPrice');
let maxPrice = document.getElementById('maxPrice');


function createItem(item) {

    items.unshift(item);
    let template = `
        <tr data-id=${item.id}>
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

    table.insertAdjacentHTML('afterbegin', template);
    localStorage.setItem('items', JSON.stringify(items));
    showAlert({
        cssClass: 'alert-success',
        timeout: 4000,
        text: 'Товар успешно добавлен'
    })

    setDefaultMaxPrice()

}
function generateList(items) {

    clearList();

    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let template = `
        <tr data-id=${item.id}>
            <td>
               <span class="nameSpan">${item.name}</span>
            </td>
            <td>
                <span class="priceSpan">${item.price}</span>
            </td>
            <td>
                <i class="fas fa-edit edit-itm"></i>
            </td>
            <td class="prop">
                <i class="fas fa-trash"></i>
            </td>
             
        </tr>
         `;

        table.insertAdjacentHTML('afterbegin', template);

    }
    setDefaultMaxPrice()
}
function clearList() {
    table.innerHTML = '';
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
function setDefaultMaxPrice() {


    items.sort(function (prev, next) {
        return prev.price - next.price
    });

    let maximum = items[items.length - 1].price || 0;
   maxPrice.setAttribute('placeholder', maximum);

   return maximum
}
function sortItems(items) {
    table.classList.toggle('reverse');

    items.sort(function (prev, next) {
        return prev.price - next.price
    });

    if (table.classList.contains('reverse')){
        generateList(items.reverse());
    }else {
        generateList(items);
    }

}
function deleteItem(trash) {
    let parent = trash.closest('tr');
    let id = parent.dataset['id'];


    for( let i = 0; i < items.length; i++){
        if (id === items[i].id){
            items.splice(i, 1);
            break
        }
    }
    localStorage.setItem('items', JSON.stringify(items));
    parent.remove();
    showAlert({
        cssClass: 'alert-warning',
        timeout: 4000,
        text: 'Товар успешно удален!'
    });

    setDefaultMaxPrice();
}
function editListItem (id, name, price) {
    let newItem = {
        id: id,
        name: name,
        price: price
    };

    for( let i = 0; i < items.length; i++){
        if (id === items[i].id){
            items.splice(i, 1, newItem);
            break
        }
    }
    localStorage.setItem('items', JSON.stringify(items));
    showAlert({
        cssClass: 'alert-info',
        timeout: 4000,
        text: 'Товар успешно изменен!'
    });
    setDefaultMaxPrice();

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
//adding one item to table
formForAdd.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!itemName.value || !itemPrice.value) {
        console.log("введите данные");
        formForAdd.reset();

    }else {
        let item = {
            id: generateId(),
            name: itemName.value,
            price: itemPrice.value

        };


        createItem(item);
        formForAdd.reset();

    }

});

//sorting Сортировка по цене осуществляется при клике на значек в шапке таблицы в столбце "Цена"
// сортировка от... и до... при крике на кнопку "Сортировка"

upDownSortBtn.addEventListener('click', function (e) {

   sortItems(items);

});
sortBtn.addEventListener('click',function (e) {

    let min = +minPrice.value || 0;
    let max = +maxPrice.value || setDefaultMaxPrice();
    let newItemsList = [];

    for (let i = 0; i < items.length; i++){
        if (items[i].price < min || items[i].price > max) continue;

        newItemsList.unshift(items[i])
    }

    generateList(newItemsList);

    console.log(newItemsList)



});

//Delete and change item
table.addEventListener('click', function (e) {

    if (e.target.classList.contains('fa-trash')) {

        deleteItem(e.target);

    }else if (e.target.classList.contains('edit-itm')){

        e.target.classList.toggle('fa-save');

        let parent = e.target.closest('tr');
        let id = parent.dataset['id'];
        let nameSpan = parent.querySelector('.nameSpan');
        let priceSpan = parent.querySelector('.priceSpan');


        if (e.target.classList.contains('fa-save')){
            nameSpan.setAttribute('contenteditable', true);
            priceSpan.setAttribute('contenteditable', true);
            nameSpan.focus();
        }else {
            nameSpan.setAttribute('contenteditable', false);
            priceSpan.setAttribute('contenteditable', false);
            nameSpan.blur();
            priceSpan.blur();
            editListItem(id, nameSpan.textContent, priceSpan.textContent);
        }



    }



});

generateList(items);






// Генерировать разметку также можно с помощью строки. Пример

// let template = `
//     <tr data-id=${item.id}>
//         <td>
//            ${item.name}
//         </td>
//         <td>
//             ${item.price}
//         </td>
//     </tr>
// `;

// Что бы добавить такую строку в виде разметки нам потребуется метод 
// table.insertAdjacentHTML('afterbegin', template);