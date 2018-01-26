//Присваивание задачи
//1
// let a, b, c, x, y, z;
//
// a = a + 10;
// a += 10;
//
// b = b * 18;
// b *= 18;
//
// c = c - 10;
// c -= 10;

//x = a + x;
//x += a;

// y = y * z;
// y *= z;
//
// i = i * 5 * y;
// i *= 5 * y;


//2

// a = a * a
// a *= a;


//Условные операторы

// let str = "hidden";
//
// str = str === 'hidden' ? 'visible' : 'hidden';
//
// console.log(str);

// используя if ......

// let val;

// if (val === 0){
//     val = 1;
//
// } else if(val < 0){
//     val = 'less then zero';
// } else {
//     val *= 10;
// }

// val = 3;
// val = val === 0 ? 1 : val < 0 ? 'less then zero' : val *= 10;


// console.log(val);


// Конструктор switch .. case задача
//
// let a = 'block';
//
// switch (a){
//
//     case 'block': console.log('block'); break;
//     case 'none': console.log('none'); break;
//     case 'inline': console.log('inline'); break;
//     default: console.log('other')
//
// }


//Преобразование типов. Задачи

// Чему равно a и почему?

//let a = 0 || 'string';// a = 'string', потому что 0 это false;

//let a = 1 && 'string'; // a = 'string', потому что первый аргумент true;

//let a = null || 25; // a = 25, потому что null это false;

//let a = null && 25; // a = null, так как первый аргумент false;

//let a = null || 0 ||35; // a = 35, т.е. Null и 0 это false;

// let a = null && 0 && 35; // a = null так как первый аргумент false;

// Что отобразится в консоли. Почему?

//12 + 14 + '12'; отобразится строка '2612', сначала выполнится сложение двух чисел,
// а потом числа со строкой, в результате получаем строку

//3 + 2 - '1'; отобразится 4, так так строка '1' преобразуется в число;

//'3' + 2 - 1; отобразится 31, так как строка '32' преобразится в число и из нее вычтется 1;

//true + 2; отобразится 3, так как true = 1;

//+'10' + 1; отобразится 11, строка '10' преобразуется в число;

//undefined + 2; отобразится NaN; так как undefined это не число;

//null + 5; отобразится 5, потому что null = 0;

//true + undefined; отобразится NaN, так как undefined это не число;



//Задачи на циклы

//1 первые буквы заглавные

// let str = 'i am in the easycode';
// let newStr='';
// for (let i = 0; i < str.length; i++){
//
//     let pre = i - 1;
//     let a;
//     if(str[pre] === ' ' || i === 0){
//         //сделал условие таким для того, чтобы если первая буква маленькая
//         // она тоже переводилась в верхний регистр
//
//         a = str[i].toUpperCase();
//     }else {
//         a = str[i];
//     }
//
//     newStr += a;
//
//
// }
// console.log(newStr);



//2 слово-перевертыш

// let str = 'tseb eht ma i';
// let newStr = '';
//
// for (let i = str.length - 1; i >= 0; i--){
//     let a = str[i];
//     newStr += a;
//
// }
//
// console.log(newStr);



//3 Факториал


// let num = 10;
// let val = 1;
//
// for (let i = 1; i <= num; i++){
//    val *= i;
// }
// console.log(val);

//4 считаем до 10ти

// let str = 'Считаем до 10ти:';
//
// for(let i = 1; i <=10; i++){
//     if(i === 10){
//         str += ' ' + i;
//     }else {
//         str += ' ' + i + ',';
//     }
// }
//
//
// console.log(str);


//5 camelCase

// let str = "JavaScript is a pretty good language";
// let camelStr = '';
//
// for (let i = 0; i < str.length; i++){
//     let pre = i - 1;
//     let a;
//
//     if (str[i] === ' '){
//         continue;
//     }
//
//     if(str[pre] === ' '){
//         a = str[i].toUpperCase();
//     }else{
//         a = str[i];
//     }
//
//     camelStr += a;
// }
//
// console.log(camelStr);


//6 нечетные числа

// for (let i = 1; i <= 15; i++){
//     if (i % 2 === 0){
//         continue;
//     }
//
//     console.log(i)
// }









