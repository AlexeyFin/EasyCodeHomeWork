да// this задачи

//1

const rectangle = {
    width: 5,
    height: 7,
    getSquare: function () {
        return `Площадь прямоугольника ${this.height * this.width} единиц`
    }
};

//2

const product = {
    price: 10,
    discount: '15%',
    getPrece: getPrice,
    getPriceWithDiscount: getPriceWithDiscount
};

function getPrice() {
    return `товар стоит ${this.price} единиц`
}

function getPriceWithDiscount() {
    return `Стоимость товара со скидкой ${this.price * (100 -  parseFloat(this.discount))/100} единиц`
}

//3

const user = {
    name: 'Abraham',
    getName: getUserName
};

function getUserName() {
    return this.name
}

//4

const object = {
    height: 10,
    IncHeight: function () {
        this.height++;
        return this.height
    }
};

//5

const numerator = {
    value: 1,
    double: function () {
        this.value *= 2;
        return this;
    },
    plusOne: function () {
        this.value++;
        return this;
    },
    minusOne: function () {
        this.value--;
        return this;
    }
};

//6

//А что тут разбираться, мы одалживаем метод одного объекта другому объекту
//в объекте user появзяется поле getName, значение которого становится равным значению поля
// getName в объекте otherUser

///////////////////////////////////////////////////////////////////////////////////////////////////////

//1
//
// function getList() {
//     return this.list;
// }
//
// let users = {
//     length: 4,
//     list: ['Alex', 'Mike', 'John', 'Den']
// };
//
// getList();// undefined, потому что у глобального объекта window нет свойства List
//
// users.getList = getList;
// users.getList();// выведет свойство list объекта, т.е. массив с данными, тотому что
// //мы создали метот getList
//
// getList.call(users);//аналогично предыдущему, т.к. мы принудительно задали контекст вызова


//2

let objList = {
    retailPrice: 3,
    quantity: 18,
    getWholesalePrice: function () {
        return this.retailPrice * this.quantity
    }
};

//3

let detailList = {
    retailPrice: 5,
    quantity: 11
};

objList.getWholesalePrice.call(detailList);

// or

detailList.getWholesalePrice = objList.getWholesalePrice;

//4

let sizes =  {
    width: 5,
    height: 10
};

let getSquare = function () {
  return this.height * this.width
};

getSquare.call(sizes);

//5

let numbers = [4, 12, 0, 10, -2, 4];

Math.min.apply(null, numbers);

//6

// const element ={
//     height: '15px',
//     marginTop: '5px',
//     marginBottom: '5px',
//     getFullHeight: function () {
//         return `Высота элемента ${parseInt(this.height) + parseInt(this.marginTop) + parseInt(this.marginBottom)}px`
//     }
// };
//
//
// const block = {
//     height: '5px',
//     marginTop: '3px',
//     marginBottom: '3px'
// };
//
//
// console.log(element.getFullHeight.call(block));

//7

let element = {
    height: 25,
    getHeight: function () {return this.height}
};


let getElementHeight = element.getHeight.bind(element);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Лексическо окружение, задачи

//1

// getBigName(userName);
//
// function getBigName(name) {
//     name = name + '';
//     return name.toUpperCase();
// }
//
// var userName = 'Alex';
//
// // выдаст UNDEFINED ну наверное потому, что переменная userName объявлена но на 176 еще не опеределена
//
//2

// function test() {
//     var name = 'Alex';
//     return getBigName(userName)
// }
//
// function getBigName(name) {
//     name = name + '';
//     return name.toUpperCase();
// }
//
// var userName = 'Ivan';
//
// console.log(test());

// мы увидим IVAN, потому что переменная userName определяется до вызова функции test которая имеет доступ
// к этой переменной, функция test передаст userName в функцию getBigName И вернет результат выполнения этой функции

//3

// var food = 'cucumber';
//
// (function () {
//     var food = 'bread';
//     getFood();
// })();
//
// function getFood() {
//     console.log(food);
// }

// вернет cucumber потому что функция getFood по цепочке scope прийдет к глобальному LE где food = "cucumber"

//Замыкание. Задачи

//1

// var dollar,
//     getDollar;
//
// (function () {
//     var dollar = 0;
//     getDollar = function () {
//         return dollar
//     }
// }());
//
// dollar = 30;
// console.log(getDollar());
//вернется 0, потому что функция замыкается
// на переменной dollar которая находится внутри модуля

//2
//
// var greet = 'hello';
//
// (function () {
//   var text = 'world';
//   console.log(greet + text);
// }());
// console.log(greet + text);

//строка 258 вернет helloworld, а строка 260 вернет text is not defined,
// потому что из вне нет доступа к переменной text

//3

function minus(val1 = 0) {

    return function (val2 = 0) {
        return val1 - val2
    }

}

//4

function MultiplyMaker(arg) {

    let count = arg;

    return function (value = 1) {
        //написал дефолтное значение чтобы не возвращался NaN
        count *= value;

        return count
    }

}

let multiply = MultiplyMaker(2);

//5

const module = (function () {

    let string = '';

    function setString(val = '') {
        string = val + '';

    }

    function getString() {
        return string
    }

    function getStringLength() {
        return string.length
    }
    
    function getReverseString() {
        return string.split('').reverse().join('')
    }

    return{
        setString: setString,
        getString: getString,
        getStringLength: getStringLength,
        getReverseString: getReverseString
    }

}());

//6

const calcModule = (function () {
    
    let count;
    
    function setCount(val) {
        count = val;
        return this
    }
    
    function getSum(val) {
        count += val;
        return this
    }
    
    function getMultiply(val) {
        count *= val;
        return this

    }
    
    function getMinus(val) {
        count -=val;
        return this
    }
    
    function getRiseToPower(val) {

        if (val > 1 ) {
            for (let i = 2; i <= val; i++) {
                count *= count
            }
        }
        
        return this
    }
    
    function getCount() {
        count.toFixed(2);
        return count
    }

    return{
        setCount: setCount,
        getSum: getSum,
        getMultiply: getMultiply,
        getMinus: getMinus,
        getRiseToPower: getRiseToPower,
        getCount: getCount
    }
    
}());














