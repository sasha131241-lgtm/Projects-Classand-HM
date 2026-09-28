// https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true

// https://jsonplaceholder.typicode.com/posts

//https://jsonplaceholder.typicode.com/users

async function returnWeather(latitude, longitude) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const response = await fetch(url);
  const dataObj = await response.json(); // Object
  return dataObj ;
}

const latitude = 44.49;
const longitude = 20.27;

const weatherData = await returnWeather(latitude, longitude);
console.log(weatherData); // Object

//  const weatherDataJson = JSON.stringify(weatherData, null, 2);
//  console.log(weatherDataJson); // String 

//  const weatherDataObj = JSON.parse(weatherDataJson);
// console.log(weatherDataObj); // Object

const temperature = weatherData.current_weather.temperature;
console.log(`Current temperature: ${temperature}°C`);

const keyName = "windspeed";
const windSpeed = weatherData.current_weather[keyName];
console.log(`Current wind speed: ${windSpeed} m/s`);

console.log("=================== Current weather data:");

for (const key in weatherData.current_weather) {   
    const value = weatherData.current_weather[key];
    console.log(`${key} >>>>> ${value}`);   
}

console.log("===Важное дополнение для использования []");

const person={
    name: "John",
    "age": 30,
    "address city": "New York"
};

console.log(person["address city"]);
const key1="address city"
console.log(person[key1]); //This will work and print "New York"
// console.log(person.adress city); // Error

console.log("===Многократное использование   []");
const key2="current_weather";
const key3="temperature";
console.log(weatherData[key2][key3]); // This will print the temperature value 

console.log("===Повторяем использование axios вместо fetch");

import axios from 'axios';

async function returnWeatherAxios(latitude, longitude) {    
    return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
}

async function mainAxios(latitude, longitude) {
    const weatherDataAxios = await returnWeatherAxios(latitude, longitude);
    console.log(weatherDataAxios.data);  // Object получаем через data
    return weatherDataAxios.data;
}


const weatherDataAxios = await mainAxios(44.49, 20.27);  // Object
const temperatureAxios = weatherDataAxios.current_weather.temperature;
console.log(`Current temperature (Axios): ${temperatureAxios}°C`);