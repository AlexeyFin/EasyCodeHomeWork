// Task number 1


function promiseCreator(time, val) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(val), time)
    });
}

const prom = promiseCreator(2000, 'Ok!');

prom.then(console.log);


//Task number 4

const ul = document.getElementById('list');

fetch('https://jsonplaceholder.typicode.com/posts',{method: 'GET'})
    .then(response => {

        return response.json()
    })
    .then(json => {

        json.forEach(item => {
            ul.insertAdjacentHTML('beforebegin', `<li class="list-group-item">${item.id} ${item.title}</li>`);

        });
    })
    .catch(err => console.log(err));




// Task number 5


Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts',{method: 'GET'}),
    fetch('https://jsonplaceholder.typicode.com/users',{method: 'GET'})
])
    .then(arr => {
        let data = [];
        arr.forEach(item => data.push(item.json()));
        return data
    })
    .then(data => {
        data.forEach(item => {
            item.then(json => {
                console.log(json.length)
            })
        })
    })
    .catch(err => console.log(err));

