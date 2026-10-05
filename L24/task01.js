/*
HW_23_TEXT
1.Из полученного ответа извлеките 
и распечатайте данные про коды ответа и их расшифровку.
2*** Подсчитайте, сколько раз в ответе упоминаются методы REST (GET, POST и т.д.).
и распечатайте результат. Используйте методы строк и массивов.
*/

let response = `
REST API (Representational State Transfer) — это архитектурный стиль взаимодействия между клиентом и сервером.

Ресурс: Все в REST является ресурсом.

HTTP-методы:
GET — получить данные.
POST — создать новые данные.
PUT / PATCH — обновить данные.
DELETE — удалить данные.

Формат данных: JSON.

GET-запрос (Получение данных):

async function getPosts() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

    if (!response.ok) {
        throw new Error('Ошибка сети');
    }

    const data = await response.json();
    console.log(data);
}

POST-запрос (Отправка данных):

const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
});

Axios:

const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');

Основные правила при работе с API:

404/500
`;

 

// =====================================
// 2. REST METHODS
// =====================================

let methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

console.log("REST methods:");

for (let method of methods) {

    let count = response.split(method).length - 1;

    console.log(`${method}: ${count}`); // Count occurrences of the method in the response
}