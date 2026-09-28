/*HW_26_TEXT
Используя два информационных ресурса (API) - https://jsonplaceholder.typicode.com/users и https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true
1. Получить список пользователей (users) с ресурса https://jsonplaceholder.typicode.com/users
2. Для каждого пользователя получить его географические координаты (latitude и longitude)   
3. Используя эти координаты, получить текущую погоду для каждого пользователя с ресурса https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true
4. Определить пользователя с самой высокой температурой и вывести его имя, телефон  
 и температуру в консоль.

 Решите задачу с использованием 
 5.fetch  
 6.axios (для одного из запросов).

*/

// https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true

// https://jsonplaceholder.typicode.com/posts

//https://jsonplaceholder.typicode.com/users

import axios from 'axios';

// 1. Вспомогательная функция для получения погоды через fetch (по координатам)
async function returnWeatherFetch(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка при запросе погоды: ${response.status}`);
  }
  const weatherData = await response.json(); // Object
  return weatherData;
}

// 2. Главная функция
async function main() {
  try {
    // Шаг 1: Используем axios для получения списка пользователей (согласно пункту 6)
    console.log("Загрузка списка пользователей через Axios...");
    const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = usersResponse.data; // Object Array

    // Инициализируем переменную для отслеживания пользователя с максимальной температурой
    let warmestUser = null;
    let maxTemperature = -Infinity;

    console.log("Загрузка погоды для каждого пользователя через fetch...\n");

    // Шаги 2 и 3: Перебираем пользователей и запросы погоды
    for (const user of users) {
      // Получаем координаты из объекта пользователя
      // Используем динамический доступ по ключу через [], как в вашем примере
      const geoKey = "geo";
      const geoData = user["address"][geoKey];
      const latitude = geoData.lat;
      const longitude = geoData.lng;

      // Запрашиваем погоду через fetch
      const weatherData = await returnWeatherFetch(latitude, longitude);

      // Извлекаем температуру с помощью многократного использования []
      const keyCW = "current_weather";
      const keyTemp = "temperature";
      const currentTemp = weatherData[keyCW][keyTemp];

      console.log(`Пользователь: ${user.name} | Город: ${user.address.city} | Температура: ${currentTemp}°C`);

      // Шаг 4: Определяем пользователя с самой высокой температурой
      if (currentTemp > maxTemperature) {
        maxTemperature = currentTemp;
        warmestUser = {
          name: user.name,
          phone: user.phone,
          temperature: currentTemp
        };
      }
    }

    // Вывод итогового результата
    console.log("\n=================== РЕЗУЛЬТАТ ===================");
    console.log("Пользователь с самой высокой температурой:");
    console.log(`Имя: ${warmestUser.name}`);
    console.log(`Телефон: ${warmestUser.phone}`);
    console.log(`Температура: ${warmestUser.temperature}°C`);

  } catch (error) {
    console.error("Произошла ошибка:", error.message);
  }
}

// Запуск программы
await main();