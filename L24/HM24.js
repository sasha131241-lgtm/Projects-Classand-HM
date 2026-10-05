
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

// Вспомогательная функция для преобразования массива продуктов в CSV-строку
function convertToCSV(products) {
  const header = "Наименование,Количество";
  const rows = products.map((item) => `${item.name},${item.count}`);
  // \uFEFF добавляется для того, чтобы Excel правильно распознавал кириллицу (UTF-8 BOM)
  return "\uFEFF" + [header, ...rows].join("\n");
}

// Вспомогательная функция для парсинга CSV обратно в массив объектов
function parseCSV(csvString) {
  // Удаляем BOM маркер, если он присутствовал
  const cleanStr = csvString.replace(/^\uFEFF/, "").trim();
  if (!cleanStr) return [];

  const lines = cleanStr.split("\n").map((line) => line.trim()).filter(Boolean);
  // Пропускаем первую строку с заголовком ("Наименование,Количество")
  const dataLines = lines.slice(1);

  return dataLines.map((line) => {
    const [name, countStr] = line.split(",");
    return {
      name: name.trim(),
      count: Number(countStr.trim()),
    };
  });
}

async function runFridgeApp() {
  const rl = readline.createInterface({ input, output });
  const fridge = [];

  // Список слов для выхода из программы
  const exitCommands = ["exit", "выход", "стоп", "stop"];

  console.log("Программа для учета продуктов в холодильнике.");
  console.log("Введите продукты и их количество.");
  console.log("Для завершения введите 'exit', 'выход', 'стоп' или 'stop'.\n");

  while (true) {
    const name = await rl.question("Введите наименование продукта: ");
    const trimmedName = name.trim();

    // ПУНКТ 2: Проверка на выход (exit, выход, стоп, stop без учета регистра)
    if (exitCommands.includes(trimmedName.toLowerCase())) {
      break;
    }

    if (trimmedName === "") {
      console.log("Наименование продукта не может быть пустым. Попробуйте снова.\n");
      continue;
    }

    const countInput = await rl.question(
      `Введите количество продукта "${trimmedName}": `
    );
    // Заменяем запятую на точку на случай ввода дробных чисел (например: 44.2 вместо 44,2)
    const count = Number(countInput.trim().replace(",", "."));

    if (Number.isNaN(count)) {
      console.log("Количество должно быть числом. Попробуйте снова.\n");
      continue;
    }

    // Ищем, есть ли уже такой продукт в холодильнике (без учета регистра)
    const existingIndex = fridge.findIndex(
      (item) => item.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (existingIndex !== -1) {
      if (count === 0) {
        // ПУНКТ 3: Если количество равно 0 — удаляем продукт
        const removed = fridge.splice(existingIndex, 1)[0];
        console.log(`\n❌ Продукт "${removed.name}" удален из списка.`);
      } else {
        // ПУНКТ 4: Если количество отлично от 0 — обновляем количество
        fridge[existingIndex].count = count;
        console.log(`\n✏️ Количество продукта "${fridge[existingIndex].name}" изменено на ${count}.`);
      }
    } else {
      if (count === 0) {
        console.log("\nНельзя добавить новый продукт с нулевым количеством.\n");
        continue;
      }
      // Добавляем новый продукт
      fridge.push({ name: trimmedName, count });
      console.log(`\n✅ Продукт добавлен: ${trimmedName} (${count})`);
    }

    console.log("----------------------------------------\n");
  }

  rl.close();

  // ПУНКТ 1: Сохранение и чтение CSV-файла в корне проекта
  if (fridge.length > 0) {
    const filePath = path.resolve("fridge.csv"); // Путь к CSV-файлу в корне проекта
    try {
      // 1. Преобразуем данные и сохраняем в CSV
      const csvContent = convertToCSV(fridge);
      await writeFile(filePath, csvContent, "utf-8");
      console.log(`\nДанные о продуктах сохранены в файл: ${filePath}`);

      // 2. Читаем данные из CSV-файла
      console.log("\nСчитываем данные из файла...");
      const fileData = await readFile(filePath, "utf-8");
      console.log("Данные из файла (сырой CSV):\n");
      console.log(fileData);

      // 3. Парсим CSV обратно в массив объектов
      const savedProducts = parseCSV(fileData);

      // 4. Выводим обновленный список продуктов
      console.log("\n1. Список продуктов в холодильнике:");
      savedProducts.forEach((product) => {
        console.log(`- ${product.name}: ${product.count}`);
      });

      console.log("\n2. Таблица продуктов:");
      console.table(savedProducts);
    } catch (error) {
      console.error("Ошибка при работе с файлом:", error.message);
    }
  } else {
    console.log("\nСписок продуктов пуст. Данные не были сохранены.");
  }
}

runFridgeApp();