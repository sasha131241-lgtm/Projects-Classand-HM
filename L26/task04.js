// const products = [
//  {name: "Молоко", count: 2.0, price: 1.5, expDate: "2024-07-01"},
//  {name: "Хлеб", count: 0.5, price: 0.8, expDate: "2024-06-15"},
//  {name: "Яйца", count: 12, price: 2.5, expDate: "2024-07-10"},
//  {name: "Сыр", count: 0.3, price: 3.0, expDate: "2024-07-20"}
// ];

function productList() {
  const products = [
    { name: "Молоко", count: 2.0, price: 1.5, expDate: "2024-07-01" },
    { name: "Хлеб", count: 0.5, price: 0.8, expDate: "2024-06-15" },
    { name: "Яйца", count: 12, price: 2.5, expDate: "2024-07-10" },
    { name: "Сыр", count: 0.3, price: 3.0, expDate: "2024-07-20" },
  ];
  return products;
}

console.log("=== Содержимое холодильника ===");
const products = productList();
console.log(products);

/*
1. Пустое название продукта
const p1 = { name: null, count: 1.0, price: 1.0, expDate: "2024-07-01" };
2. Обрезанное название продукта
const p2 = { name: "Сы", count: 0.3, price: 3.0, expDate: "2024-07-20" };
3. Некорректное название продукта
const p3 = { name: "№-Сы123@", count: 0.3, price: 3.0, expDate: "2024-07-20" };
4. Отрицательное количество продукта
const p4 = { name: "Сыр", count: -0.3, price: 3.0, expDate: "2024-07-20" };
5. Отрицательная цена продукта
const p5 = { name: "Сыр", count: 0.3, price: -3.0, expDate: "2024-07-20" }; 
6. Некорректная дата истечения срока годности 
(не существует месяц 13 и день 45)
const p6 = { name: "Сыр", count: 0.3, price: 3.0, expDate: "2024-13-45" };
7. Некорректный формат (не YYYY-MM-DD - не ISO) даты истечения срока годности
const p7 = { name: "Сыр", count: 0.3, price: 3.0, expDate: "11.07.2023" };
*/

// 1. Пустое название продукта
const p1 = { name: null, count: 1.0, price: 1.0, expDate: "2024-07-01" };
function printUpperCaseName(product) {
  console.log(product.name.toUpperCase());
}
// printUpperCaseName(p1);  // TypeError: Cannot read properties of null (reading 'toUpperCase')

// 2. Обрезанное название продукта
const p2 = { name: "Сы", count: 0.3, price: 3.0, expDate: "2024-07-20" };
function getFirstThreeChars(product) {
  return product.name.substring(0, 3); // [0, 3) - вернет первые 3 символа строки]
}
// console.log(getFirstThreeChars(p2));  // "Сы"    НЕВЕРНЫЙ РЕЗУЛЬТАТ - НУЖНО 3 СИМВОЛА

// 3. Некорректное название продукта
const p3 = { name: "№-Сы123@", count: 0.3, price: 3.0, expDate: "2024-07-20" };
// например проблема при поиске или преводе на другой язык

// 4. Отрицательное количество продукта
const p4 = { name: "Сыр", count: -0.3, price: 3.0, expDate: "2024-07-20" };
const totalPriceP4 = p4.count * p4.price; // -0.9
// console.log(`Total price for ${p4.name}: ${totalPriceP4}`); // -0.9  - НЕВЕРНЫЙ РЕЗУЛЬТАТ

// 5. Отрицательная цена продукта
const p5 = { name: "Сыр", count: 0.3, price: -3.0, expDate: "2024-07-20" };
const totalPriceP5 = p5.count * p5.price;
console.log(`Total price for ${p5.name}: ${totalPriceP5}`); // -0.9  - НЕВЕРНЫЙ РЕЗУЛЬТАТ

// 6. Некорректная дата истечения срока годности
const p6 = { name: "Сыр", count: 0.3, price: 3.0, expDate: "2024-15-35" };
// console.log(`Expiration date for ${p6.name}: ${(new Date(p6.expDate))}`); // Expiration date for Сыр: Invalid Date

// 7. Некорректный формат (не YYYY-MM-DD - не ISO) даты истечения срока годности
const p7 = { name: "Сыр", count: 0.3, price: 3.0, expDate: "25#05#2023" };
//console.log(`Expiration date for ${p7.name}: ${(new Date(p7.expDate))}`); // Expiration date for Сыр: Invalid Date

console.log("=== Содержимое холодильника  ===");
console.log(products);

function isProductValid(product) {
  const title = product.name;
  const count = product.count;
  const price = product.price;
  const expDate = product.expDate;

  if (title === null) {
    return false;
  }

  if (title.lenght < 3) {
    return false;
  }

  if (!/^[А-Я][а-я]+$/.test(title)) {
    // в названии только русские маленкие и большие буквы
    return false;
  }

  if (price < 0) {
    return false;
  }

  if (count < 0) {
    return false;
  }
  //TO DO добавить проверки даты

  return true;
}

function filterProducts(products){
    return products.filter(p => isProductValid(p));
}

console.log("====== Допустимые продукты =========")
const validProducts=filterProducts(products);
console.log(validProducts);