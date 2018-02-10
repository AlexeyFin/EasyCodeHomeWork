let tasks = [];

let ul = document.querySelector('.list-group');
let form = document.forms['addTodoItem'];
let inputText = form.elements['todoText'];
let successAlert = document.querySelector('.alert-success');
let removeAlert = document.querySelector('.alert-danger');
let infoAlert = document.querySelector('.alert-info');
let clearListBtn = document.getElementById('clearListBtn');

function listTamplate(task) {

    let li = document.createElement('li');
    li.textContent = task;
    li.className = 'list-group-item d-flex align-items-center';

    let iDel = document.createElement('i');
    iDel.className = 'fas fa-trash-alt delete-item ml-auto';
    li.appendChild(iDel);
    return li;
}


function clearList() {
    ul.innerHTML = '';
}

function generateList(taskArray) {

    clearList();

    for (let i = 0; i < taskArray.length; i++ ){

        let li = listTamplate(taskArray[i]);
        ul.appendChild(li)

    }

    checkList(tasks);

}

function addList(list) {

    tasks.unshift(list);
    ul.insertAdjacentElement('afterBegin',listTamplate(list))

}


ul.addEventListener('click', function (e) {

    //Delete item func

    if(e.target.classList.contains('delete-item')){

        let parent = e.target.closest('li');
        let index = tasks.indexOf(parent.textContent);
        tasks.splice(index, 1);
        parent.remove();
        showAlert(removeAlert);
        checkList(tasks);

        }
});


form.addEventListener('submit', function (e) {
    e.preventDefault();

    if ( !inputText.value) {
        inputText.classList.add('is-invalid');

    }else {
        addList(inputText.value);
        form.reset();
        inputText.classList.remove('is-invalid');
        showAlert(successAlert);
        checkList(tasks);
    }


});

inputText.addEventListener('keyup', function (e) {

    if(inputText.value){
        inputText.classList.remove('is-invalid');
    }

});

function showAlert(alert) {

    alert.classList.add('d-block');

    setTimeout(function () {
        alert.classList.remove('d-block');
    }, 2000)


}

function checkList(list) {

    if(list.length){
        infoAlert.classList.add('d-none');
    }else {
        infoAlert.classList.remove('d-none');
    }
}

clearListBtn.addEventListener('click', function (e) {

    tasks.splice(0, tasks.length);
    generateList(tasks);

});


generateList(tasks);
