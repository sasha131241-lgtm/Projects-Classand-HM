const products = [
 {name: "Молоко", count: 2.0, price: 1.5, expDate: "2024-07-01"},
 {name: "Хлеб", count: 0.5, price: 0.8, expDate: "2024-06-15"},
 {name: "Яйца", count: 12, price: 2.5, expDate: "2024-07-10"},
];

console.log("===Содержимое холодильника ===");
console.log(products);
const p2={name: "Сыр", count: 0.3, price: 3.0, expDate: "2024-07-20"};
products.push(p2);

console.log("=== Содержимое холодильника после добавления продукта ===");
console.log(products);

console.log("=== Содержимое холодильника в виде JSON ===");
const res=JSON.stringify(products, null, 2);
console.log(res);

console.log("=== Содержимое холодильника снова в виде объекта ===");
const res2=JSON.parse(res);
console.log(res2);

products[0].name = "Овсяное молоко";
console.log(products)

// const p = products[0];
// console.log(`Название: ${p.name}, Количество: ${p.count}, Цена: ${p.price}, Срок: ${p.expDate}`);
 
// const frozenProducts = Object.freeze([
//   {name: "Молоко", count: 2.0}
// ]);

// // Попытка изменить свойство не сработает (в строгом режиме вызовет ошибку)
// frozenProducts[0].name = "Овсяное молоко";