//Задача 1

function multiply() {

    if(!arguments.length) return 0;

    let value = 1;
    for (let i = 0; i < arguments.length; i++){

     value *= arguments[i];
    }

    return value;

}

// console.log(multiply());

//задача 3

function reverseString(str) {

    let newStr = '';

    for(let i = str.length - 1; i >= 0; i--){
        newStr += str[i];
    }

    return newStr;
}

// console.log(reverseString('Alex'));

//Задача 4

function getCodeStringFromText(str) {

    let newStr = '';

    for( let i = 0; i < str.length; i++){
        let code = str.charCodeAt(i);
        newStr += code + ' ';
    }

    return newStr;
}

//console.log(getCodeStringFromText('my name is Alex'));


//Задание 6
let arr1 = ['my', 'name', 'is', 'alex'];
let arr2 = [10, 20, 30];
let arr3 = [{age:45, name: 'John'}, {age: 20, name: 'Aaron'}];
let arr4 = ['abc', '123'];
let arr5 = [1, 2, 3];

function getValue(someArr,handler) {
    let value = 'New value: ';
    for (let i = 0; i < someArr.length; i++){
        value += handler(someArr[i]);
    }


    return value;
}

function getCamelCase(str) {

    let newStr = '';
    newStr += str[0].toUpperCase() + str.slice(1);
    return newStr;
}

function getMultiply(num) {
    let newVal;
    newVal = num * 10 + ', ';
    return newVal;
}

function getInfo(obj) {

    let info = '';
    info += obj.name + ' is ' + obj.age + ', ';

    return info;

}

function getReverse(str) {
    let newStr = '';
    let revStr = '';
    for (let j = str.length - 1; j >= 0; j--){

        revStr += str[j];
    }

    newStr += revStr + ' ';
    return newStr;
}

function  getSumWithFive(num) {

    return num + 5 + ', ';
}



console.log(getValue(arr1, getCamelCase));
console.log(getValue(arr2, getMultiply));
console.log(getValue(arr3, getInfo));
console.log(getValue(arr4, getReverse));
console.log(getValue(arr5, getSumWithFive));


//Доп задание, метод "every"


function customEvery(array, handler) {

    for (let i = 0; i < array.length; i++) {

        if (!handler(array[i])) return false
    }
    return true;
}



let checkEvery = customEvery([1, 2, 3, '4'], function (elem) {
    return typeof elem === 'number'
});

console.log(checkEvery);
















