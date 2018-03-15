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




// Task number 5.1


// Promise.all([
//     fetch('https://jsonplaceholder.typicode.com/posts',{method: 'GET'}),
//     fetch('https://jsonplaceholder.typicode.com/users',{method: 'GET'})
// ])
//     .then(arr => {
//         let data = [];
//         arr.forEach(item => data.push(item.json()));
//         return data
//     })
//     .then(data => {
//         data.forEach(item => {
//             item.then(json => {
///Вывод количества постов/юзеров равному длине массива
//                 console.log(json.length)
//             })
//         })
//     })
//     .catch(err => console.log(err));

//Task number 5.2
let totalData = {
    'posts': {},
    'users': {}
};

let postsFetch = fetch('https://jsonplaceholder.typicode.com/posts',{method: 'GET'})
    .then(res => res.json());
let usersFetch = fetch('https://jsonplaceholder.typicode.com/users',{method: 'GET'})
    .then(res => res.json());


Promise.all([postsFetch, usersFetch])
    .then(data => {
        totalData['posts'] = data[0];
        totalData['users'] = data[1];

        return totalData
    })
    .then(data => {
        console.log(`Количество постов: ${data.posts.length}`);
        console.log(`Количество юзеров: ${data.users.length}`);
    })
    .catch(err => console.log(err));

//Как лучше было это сделать?