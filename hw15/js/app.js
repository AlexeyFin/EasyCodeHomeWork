// Init Tasks module
const tasks = Tasks.getInstance();

// Init UI module
const ui = UI;

// Init Localstorage module
const localstorage = Localstorage;

// Init Notification
const notification = Notification;

// Init Observers
const addTaskObserver = new EventObserver();
const removeTaskObserver = new EventObserver();
const removeAllTasksObserver = new EventObserver();
const editTaskObserver = new EventObserver();

// Subscribe on task events
addTaskObserver.subscribe(localstorage.update);
addTaskObserver.subscribe(notification.show);
addTaskObserver.subscribe(ui.checkList);

removeTaskObserver.subscribe(localstorage.update);
removeTaskObserver.subscribe(notification.show);
removeTaskObserver.subscribe(ui.checkList);

removeAllTasksObserver.subscribe(localstorage.update);
removeAllTasksObserver.subscribe(notification.show);
removeAllTasksObserver.subscribe(ui.checkList);

editTaskObserver.subscribe(localstorage.update);
editTaskObserver.subscribe(notification.show);

// Init elements
const form = document.forms['addTodoItem'];
const inputText = form.elements['todoText'];
const ul = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-btn');
const searchForm = document.forms['searchTodoItem'];
const searchInputText = searchForm.elements['searchText'];

window.addEventListener('load', function (e) {
    let ls = localstorage.getTasks();
    if (ls.length) {
        tasks.setTasks(ls)
            .then(tasks => {
                tasks.forEach(task => ui.addTask(task));
            })
    } else {
        ui.checkList();
    }
});

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!inputText.value) {
        // show error, is-invalid
    } else {
        tasks.addTask({ text: inputText.value })
            .then(task => ui.addTask(task))
            .then(() => addTaskObserver.fire({
                text: 'Новая задача добавлена успешно!',
                class: 'alert alert-success'
            }));
    }
    form.reset()
});

ul.addEventListener('click', function (e) {
    let id = e.target.closest('li').getAttribute('data-id');

    if (e.target.classList.contains('delete-item')) {
        tasks.removeTask(id)
            .then(() => ui.deleteTask(id))
            .then(() => removeTaskObserver.fire({
                text: 'Задача удалена успешно!',
                class: 'alert alert-warning'
            }))
    }

    if (e.target.classList.contains('edit-item')) {
       if (!e.target.classList.contains('fa-save')) {
            ui.getFocus(e.target)
       } else {
            ui.editTask(e.target)
                .then(data => tasks.editTask(data))
                .then(() => editTaskObserver.fire({
                    text: 'Задача обновлена успешно!',
                    class: 'alert alert-success'
                }))
       }

    }
});

clearBtn.addEventListener('click', function (e) {
    tasks.removeAll()
        .then(() => ui.deleteAll())
        .then(() => removeAllTasksObserver.fire({
            text: 'Все задачи удалены успешно!',
            class: 'alert alert-warning'
        }))
});

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    tasks.searchItems(searchInputText.value)
        .then((data) => {
            ui.deleteAll();
            return data
        })
        .then(data => {
            data.forEach(task => {
                ui.addTask(task)
            })
        })
        .then(() => {
            ui.checkList()
        });
});

searchForm.addEventListener('reset', (e) => {
    ui.deleteAll()
        .then(() => tasks.getTasks())
        .then(data => {
            data.forEach(task => {
                ui.addTask(task)
            })
        })
        .then(() => ui.checkList())
});