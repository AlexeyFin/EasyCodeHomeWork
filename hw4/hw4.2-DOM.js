//Доступ к DOM задачи
//1
// console.log(document.head);
// 2
// console.log(document.body);
//3
// console.log(document.body.children);

//4

// console.log(document.body.firstElementChild); // the first div
//
// console.log(document.body.firstElementChild.children);// 4.a
//
// //4.b
// let children = document.body.firstElementChild.children;
//
// children = Array.prototype.slice.call(children);
//
// children.splice(0, 1);
// children.splice(children.length - 1, 1);
//
//
// console.log(children);



//DOM задачи

//1

const isParent = (parent, child) => parent.contains(child);


console.log(isParent(document.body.children[0], document.querySelector('mark')));
console.log(isParent(document.querySelector('ul'), document.querySelector('mark')));

//2

let aList = document.getElementsByTagName('a');

function show (arr) {
    let toShow = [];

    for (let i = 0; i < aList.length; i++){
        if(!aList[i].closest('li')) toShow.push(aList[i])
    }

    return toShow

}

// console.log(show(aList));


//3

//console.log(document.querySelector('ul').previousElementSibling);// элемент до списка ul
//console.log(document.querySelector('ul').nextElementSibling);// элемент после списка ul


//4

//console.log('В списке ul находится '+ document.querySelectorAll('ul li').length + ' элемента li');



