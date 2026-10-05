// Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

// npm init

// npm install axios



//     https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true


// "type": "commonjs",  ->   "type": "module",

// Example of commonjs module export and import
// const {validateEcmascriptText} = require("./service/validate.js");
// module.exports = {validateEcmascriptText};


// =====================================63-23=

// https://jsonplaceholder.typicode.com/posts

//==========================================

// https://aistudio.google.com/api-keys

//  ???????????????????????????????????????????????????????

// npm install @google/genai
//===================================================
/*
1.
Параметры → Система → О системе → Дополнительные параметры системы → Переменные среды
Добавляйте ключ в раздел Переменные пользователя, а не 
Системные переменные — права администратора не нужны, и ключ будет доступен 
только вашей учётной записи.

2.
Powershell

[Environment]::SetEnvironmentVariable(
  "GEMINI_API_KEY",
  "ваш_настоящий_ключ",
  "User"
)

$env:GEMINI_API_KEY
if ($env:GEMINI_API_KEY) { "Ключ найден" } else { "Ключ не найден" }

node -e "console.log(process.env.GEMINI_API_KEY ? 'Ключ найден' : 'Ключ не найден')"

const apiKey = process.env.GEMINI_API_KEY;

`${apiKey}`
*/


// npm install @inquirer/prompts

//============================================
//============================================

/*
HW_23_TEXT
1.Из полученного ответа извлеките 
и распечатайте данные про коды ответа и их расшифровку.
2*** Подсчитайте, сколько раз в ответе упоминаются методы REST (GET, POST и т.д.).
и распечатайте результат. Используйте методы строк и массивов.
*/


import { GoogleGenAI } from "@google/genai";

async function askAi(prompt) {
  const genAi = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await genAi.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
  });

  return response.text;
}

async function main() {
  const prompt =
    "Напиши что такое REST API и как его использовать в JavaScript";

  const aiResponse = await askAi(prompt);

  const lines = aiResponse.split("\n");

  const codeLine = lines.filter((line) => {
    return line.includes("200") || line.includes("404") || line.includes("500");
  });

  const words = aiResponse.split(/[\s,.:;()\`'\"\-]+/); //разбивает текст на отдельные чисте слова
  const names_methods = ["GET", "POST", "PUT", "DELETE", "PATCH"];
  let count_methods = 0;

  for (const word of words) {
    if (names_methods.includes(word)) {
      count_methods++;
    }
  }

  console.log("AI Response:\n", aiResponse);
  console.log("================================");
  console.log("Найденные строки с кодами ответа:");
  console.log(codeLine);
  console.log("================================");
  console.log(`Количество упоминаний HTTP-методов: ${count_methods}`);
}

main();


