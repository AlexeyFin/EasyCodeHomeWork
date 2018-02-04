
let tasks = [
    "Learn JS",
    "learn Angular 4",
    "visit conf"
];

let ul = document.querySelector('.list-group');

function listTamplate(task) {

    let li = document.createElement('li');
    li.textContent = task;
    li.className = 'list-group-item';

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

}

generateList(tasks);
function addList(list) {

    tasks.unshift(list);
    generateList(tasks);

}


let infoAlert = document.querySelector('.alert-info');

function showMsg(msg) {


    infoAlert.textContent = msg;
    infoAlert.classList.add('show');

    setTimeout(hideAlert, 2000, infoAlert);

}


function hideAlert(alert) {

    alert.classList.remove('show');
    alert.innerHTML = '';

}

showMsg('Hi mate');


