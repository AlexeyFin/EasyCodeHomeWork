// Получение массива данных с сервера
ajax.send({
    method: 'GET',
    url:'https://jsonplaceholder.typicode.com/todos',
    success: function (res) {
        tasks = JSON.parse(res);
        console.log(tasks);
        generateList(tasks);
    },
    error: function (err) {
        console.log(err);
    }
});

let ul = document.querySelector('.list-group');
let form = document.forms['addTodoItem'];
let inputText = form.elements['todoText'];
let infoAlert = document.getElementById('infoAlert');

function getTemplate(object) {
    let template = `
        <li data-id=${object.id} class="${object.completed ? "bg-success" : ""} list-group-item d-flex align-items-center" >
            <span class="taskName">${object.title}</span>
            <span class="management ml-auto">  
                <i class="fas fa-edit edit-itm editItem"></i>
                <i class="fas ${object.completed ? "fa-check" : "fa-times"} ml-2 status"></i>
                <i class="fas fa-trash ml-2 deleteItem"></i>
            </span>
        </li>
    `;

    return template
}
function generateList(data) {
    clearList();

    //type of data is array
    for (let i = 0; i < data.length; i++) {
        ul.insertAdjacentHTML('afterbegin', getTemplate(data[i]));
    }
}
function clearList() {
    ul.innerHTML = '';
}
function generateTask(object) {
    ul.insertAdjacentHTML('afterbegin', getTemplate(object));
}
function editItem(item) {
    let parent = item.closest('li');
    let contentId = parent.dataset['id'];
    let content = parent.querySelector('.taskName');

    if (item.classList.contains('fa-save')){
        content.setAttribute('contenteditable', true);
        content.focus();
    } else {
        content.setAttribute('contenteditable', false);

        ajax.send({
           method: 'PATCH',
           url: `https://jsonplaceholder.typicode.com/todos/${contentId}`,
           data: JSON.stringify({
               title: content.textContent,
               completed: parent.classList.contains('bg-success')
           }),
           headers: {
               "Content-type": "application/json; charset=UTF-8"
           },
           success: function (res) {

           },
           error: function (err) {
               console.log(err)
           }

        });

    }
}
function deleteItem(item) {
    let contentId = item.closest('li').dataset['id'];

    ajax.send({
        method: 'DELETE',
        url:`https://jsonplaceholder.typicode.com/todos/${contentId}`,
        success: function (res) {
            showAlert({
                text: 'Item has been deleted',
                cssClass: 'alert-warning',
                timeout: 3000
            });
            console.log("Task has been deleted successfully")
        },
        error: function (err) {
            console.log(err)
        }
    })
}
function showAlert(settings) {
    infoAlert.classList.toggle('d-none');
    infoAlert.classList.add(settings.cssClass);
    infoAlert.textContent = settings.text;

    setTimeout(function () {
        infoAlert.classList.toggle('d-none');
        infoAlert.classList.toggle(settings.cssClass)
    }, settings.timeout);
}

form.addEventListener('submit', function (e) {
   e.preventDefault();

   let data = {
       title: inputText.value,
       completed: false
   };
    ajax.send({
        method: 'POST',
        url:'https://jsonplaceholder.typicode.com/todos',
        data: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        success: function (res) {
            let response = JSON.parse(res);
            console.log(response);
            generateTask(response);
            showAlert({
                text: 'Item has been added',
                cssClass: 'alert-success',
                timeout: 3000
            })

        },
        error: function (err) {
            console.log(err)
        }
    });
    form.reset();
});
ul.addEventListener('click', function (e) {
    let parent = e.target.closest('li');

    if (e.target.classList.contains('editItem')){
        //edit item
        e.target.classList.toggle('fa-save');
        editItem(e.target);
    } else if (e.target.classList.contains('status')){
        // change status
        e.target.classList.toggle('fa-times');
        e.target.classList.toggle('fa-check');
        parent.classList.toggle('bg-success');
        editItem(e.target);
    } else if (e.target.classList.contains('deleteItem')){
        // delete item
        parent.remove();
        deleteItem(e.target);
    }
});













































































// function listTamplate(task) {
//
//     let li = document.createElement('li');
//     li.textContent = task.title;
//     li.className = 'list-group-item d-flex align-items-center';
//     if (task.completed){
//         li.classList.add('bg-success');
//     }
//
//     let iDel = document.createElement('i');
//     iDel.className = 'fas fa-trash-alt delete-item ml-auto';
//     li.appendChild(iDel);
//     return li;
// }
//
//
// function clearList() {
//     ul.innerHTML = '';
// }
//
// function generateList(taskArray) {
//
//     clearList();
//
//     for (let i = 0; i < taskArray.length; i++ ){
//
//         let li = listTamplate(taskArray[i]);
//         ul.appendChild(li)
//
//     }
//
//     checkList(tasks);
//
// }
//
// function addList(list) {
//
//     tasks.unshift(list);
//     ul.insertAdjacentElement('afterBegin',listTamplate(list))
//
// }
//
//
// ul.addEventListener('click', function (e) {
//
//     //Delete item func
//
//     if(e.target.classList.contains('delete-item')){
//
//         let parent = e.target.closest('li');
//         let index = tasks.indexOf(parent.textContent);
//         tasks.splice(index, 1);
//         parent.remove();
//         showAlert(removeAlert);
//         checkList(tasks);
//
//         }
// });
//
//
// form.addEventListener('submit', function (e) {
//     e.preventDefault();
//
//     if ( !inputText.value) {
//         inputText.classList.add('is-invalid');
//
//     }else {
//         addList(inputText.value);
//         form.reset();
//         inputText.classList.remove('is-invalid');
//         showAlert(successAlert);
//         checkList(tasks);
//     }
//
//
// });
//
// inputText.addEventListener('keyup', function (e) {
//
//     if(inputText.value){
//         inputText.classList.remove('is-invalid');
//     }
//
// });
//
// function showAlert(alert) {
//
//     alert.classList.add('d-block');
//
//     setTimeout(function () {
//         alert.classList.remove('d-block');
//     }, 2000)
//
//
// }
//
// function checkList(list) {
//
//     if(list.length){
//         infoAlert.classList.add('d-none');
//     }else {
//         infoAlert.classList.remove('d-none');
//     }
// }
//
// clearListBtn.addEventListener('click', function (e) {
//
//     tasks.splice(0, tasks.length);
//     generateList(tasks);
//
// });
//
//
