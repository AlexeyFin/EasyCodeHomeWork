// Init Id module
const id = Id;

const Tasks = (function () {
    
    let tasks = [];
    let instance;
    
    const getTasks = function () {
        return tasks;
    };
    
    const setTasks = async function (array) {
        tasks = array;
        return tasks;
    };
    
    const addTask = async function (task) {
        task.id = id.generate();
        await tasks.unshift(task);
        return task;
    };

    const removeTask = async function (id) {
        tasks = await tasks.filter(task => task.id !== id);
        return tasks;
    };

    const removeAll = async function () {
        tasks = [];
    };

    const editTask = async function (data) {
        for( let i = 0; i < tasks.length; i++){
            if (data.id === tasks[i].id){
                await tasks.splice(i, 1, data);
                break
            }
        }

        return tasks
    };

    const searchItems = async function (text) {
         return tasks.filter(task => {
            return (task.text.toLowerCase().indexOf(text) + 1)
        })
    };

    const createInstance = function () {
        return {
            getTasks,
            setTasks,
            addTask,
            removeTask,
            removeAll,
            editTask,
            searchItems,
        }
    };

    return {
        getInstance: function () {
            return instance || (instance = createInstance());
        }
    }
    
}());