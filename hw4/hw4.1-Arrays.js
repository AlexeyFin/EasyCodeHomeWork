//Массивы
// 1

let someArr = [1,2,3,4,5];

function getDbl(arr) {

    let length = arr.length;

    for (let i = 0; i < length; i++){

        arr.push(arr[i]);
    }

    return arr;

}

//console.log(getDbl(someArr));

//2

const getLastElem = arr => arr[arr.length-1];

// console.log(getLastElem(someArr));

//3

function getArray(N) {

    let arr = [];

    for (let i = 1; i <= N; i++){

        arr.push(i);

    }

    return arr;
}

//console.log(getArray(15));

//4

function changeCollection(...arr) {

    let newCollection = [];

    for (let i = 0; i  < arr.length; i++){

        arr[i].shift();

        newCollection.push(arr[i]);
    }

    return newCollection;
}

//
// console.log(changeCollection([1,2,3,4,5],['a','s','b'],[11,24,32,44]));


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////


//1

let randomStr = 'qazwsxedcrfvtgb';

const sortAndReverse = str => str.split('').sort().reverse().join('');


//можно ли такую длинную цепочку пихать в функцию стрелкой?

// function sortAndReverse(str) {
//
//     let newStr = str.split('').sort().reverse().join('');
//
//     return newStr;
//
// }

//console.log(sortAndReverse(randomStr));

//2

let myArr = [2, 4, 7, 1, -2, 10, -9];

// function getSortAndReverse(arr) {
//
//     arr.sort(function (prev, next) {
//         return prev - next;
//     });
//
//      return arr.reverse();
// }

// console.log(getSortAndReverse(myArr));

//3

function getNewArray(arr, from, to) {

    return arr.slice(from, to + 1);

}

// console.log(getNewArray(myArr, 2, 4));

//4

const dblArr = arr =>arr.concat(arr);

// console.log(dblArr(['one', 2, 'three', 4]));

//5

let array1 = [1, 2, 3, 4, 5];

array1.splice(2,2);

// console.log(array1);

// 6

let arr2 = [1, 2,3 ,4, 5];

arr2.splice(2,2, 'three', 'four');

// console.log(arr2);

//7
let arr3 = ['I', 'am', 'an', 'array'];
arr3.splice(3, 0, 'awesome');
// console.log(arr3);

//8

let customCollection = [[14, 45], [1],[6, 7, 8, 9, 12], ['a', 'b', 'c'], []];

customCollection.sort(function (prev, next) {
    return prev.length - next.length;
});


// console.log(customCollection);

// 9 


let randomArray = [1, 2, 3, 4, 5];


function getCopy(arr) {
    let copiedArray = [];
    let a = arr.splice(0);
    copiedArray =  copiedArray.concat(a);

    return copiedArray
}

// console.log(getCopy(randomArray));

// 10

let objCollection = [
    {
        cpu: 'intel',
        info: {
            cores: 2,
            cache: 3
        }

    },
    {
        cpu: 'intel',
        info: {
            cores: 4,
            cache: 4
        }

    },
    {
        cpu: 'amd',
        info: {
            cores: 1,
            cache: 1
        }

    },
    {
        cpu: 'intel',
        info: {
            cores: 3,
            cache: 2
        }

    },
    {
        cpu: 'amd',
        info: {
            cores: 4,
            cache: 2
        }

    }
];


objCollection.sort(function (prev, next) {

    return prev.info.cores - next.info.cores

});
//
// console.log(objCollection);


//11

let products = [
    {
        title: 'prod1',
        price: 5.2
    },
    {
        title: 'prod2',
        price: 0.18
    },
    {
        title: 'prod3',
        price: 15
    },
    {
        title: 'prod4',
        price: 25
    },
    {
        title: 'prod5',
        price: 18.9
    },
    {
        title: 'prod6',
        price: 8
    },
    {
        title: 'prod7',
        price: 19
    },
    {
        title: 'prod8',
        price: 63
    },
];



function filterCollection(products, from, to) {

    let toSort = [];

    for (let i = 0; i < products.length; i++){

        if(products[i].price >= from && products[i].price <= to){

            toSort.push(products[i]);
        }

    }

    toSort.sort(function (prev, next) {
        return prev.price - next.price
    });

    return toSort;
}

// console.log(filterCollection(products, 15, 30));












