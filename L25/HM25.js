import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

async function writeToJsonFile(filePath, data) {
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function appendToJsonFile(filePath, data) {
  const fileData = await readFile(filePath, "utf-8");
  const existingData = JSON.parse(fileData);
  const updatedData = [...existingData, ...data];
  await writeToJsonFile(filePath, updatedData);
}

async function readFromJsonFile(filePath) {
  const fileData = await readFile(filePath, "utf-8");
  return JSON.parse(fileData);
}

function addOrUpdateProduct(fridge, name, count, price, expDate) {
  // milk 3.0 15.2 2026-12-31  date-ISO format YYYY-MM-DD
  const idx = fridge.findIndex((product) => product.name === name);
  if (idx !== -1) {
    fridge[idx].count += count;
    fridge[idx].price = price;
    fridge[idx].expDate = expDate;
  } else {
    fridge.push({ name, count, price, expDate });
  }
}

function removeProduct(fridge, name) {
  const idx = fridge.findIndex((product) => product.name === name);
  if (idx !== -1) {
    fridge.splice(idx, 1);
  }
}

function displayFridgeContents(fridge) {
  console.log("=== Содержимое холодильника ===");
  let count = 1;
  if (fridge.length === 0) {
    console.log("Холодильник пуст.");
  } else {
    fridge.forEach((product) => {
      console.log(
        `${count++}. ${product.name}: ${product.count} шт., ${product.price} $, expDate: ${product.expDate}`
      );
    });
  }
}

async function displayFileJsonContents(filePath) {
  const fileData = await readFile(filePath, "utf-8");
  console.log("Данные из файла (сырой JSON):", fileData);
}

async function runFridgeApp(fileName, stopWords) {
  const rl = readline.createInterface({ input, output });
  const fridge = [];

  console.log("Программа для учета продуктов в холодильнике.");
  console.log(
    "Введите продукты в холодильнике. Для завершения введите ",
    stopWords.join(", "),
    " (без учёта регистра)."
  );

  while (true) {
    const name = await rl.question("Введите наименование продукта: ");
    const trimmedName = name.trim();

    if (stopWords.includes(trimmedName.toLowerCase())) {
      break;
    }

    if (trimmedName === "") {
      console.log(
        "Наименование продукта не может быть пустым. Попробуйте снова."
      );
      continue;
    }

    const countInput = await rl.question(
      `Введите количество продукта "${trimmedName}": `
    );
    const count = +countInput.trim();

    if (Number.isNaN(count)) {
      console.log("Количество введено некорректно. Попробуйте снова.");
      continue;
    }

    const priceInput = await rl.question(
      `Введите цену продукта "${trimmedName}": `
    );
    const price = +priceInput.trim();

    if (Number.isNaN(price)) {
      console.log("Цена введена некорректно. Попробуйте снова.");
      continue;
    }

    const expDateInput = await rl.question(
      `Введите срок годности продукта "${trimmedName}" (YYYY-MM-DD): `
    );
    const expDate = expDateInput.trim();

    // Работа со структурой данных поручена вспомогательным функциям
    const idx = fridge.findIndex((product) => product.name === trimmedName);

    if (idx !== -1 && count === 0) {
      removeProduct(fridge, trimmedName);
      console.log(`Продукт "${trimmedName}" удалён из списка.`);
    } else {
      addOrUpdateProduct(fridge, trimmedName, count, price, expDate);
      console.log(`Данные о продукте "${trimmedName}" успешно обработаны.`);
    }

    console.log("Текущий список продуктов:");
    console.table(fridge);
  }

  rl.close();

  if (fridge.length > 0) {
    const filePath = path.resolve(fileName);
    try {
      // 1. Сохраняем данные в файл с помощью writeToJsonFile
      await writeToJsonFile(filePath, fridge);
      console.log(`Данные о продуктах сохранены в файл: ${filePath}`);

      // 2. Отображаем сырые данные JSON
      await displayFileJsonContents(filePath);

      // 3. Читаем данные из файла через readFromJsonFile
      const saveProducts = await readFromJsonFile(filePath);

      // 4. Выводим список продуктов с помощью displayFridgeContents
      displayFridgeContents(saveProducts);
    } catch (error) {
      console.error("Ошибка при работе с файлом:", error.message);
    }
  } else {
    console.log("Список продуктов пуст. Данные не были сохранены.");
  }
}

const fileName = "fridge.json";
const stopWords = ["exit", "выход", "стоп", "stop"];
runFridgeApp(fileName, stopWords);