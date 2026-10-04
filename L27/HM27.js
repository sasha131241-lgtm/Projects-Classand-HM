import { GoogleGenAI } from "@google/genai";
 
// Инициализация API-клиента Google GenAI
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY }); // здесь вводим свой API KEY
function getProducts() {
 const products = [
    { name: "Молоко", count: 2.0, price: 1.5, expDate: "2024-07-01" },
    { name: "Хлеб", count: 0.5, price: 0.8, expDate: "2024-06-15" },
    { name: "Яйца", count: 12, price: 2.5, expDate: "2024-07-10" },
    { name: "Сыр", count: 0.3, price: 3.0, expDate: "2024-07-20" },
    { name: "Свекла", count: 1.0, price: 1.2, expDate: "2024-07-05" },
    { name: "Говядина", count: 0.5, price: 5.0, expDate: "2024-07-15" },
    {name: "Лук", count: 0.2, price: 0.5, expDate: "2024-07-12" }
  ];
  return products;
}

function createBasePromptByRole(user) {
  if (user.role.toUpperCase() === "ADMIN") {
    return `
        Ты - квалифицированный повар, определяющий инградиенты
        блюда по названию блюда. 
        Тебе дается название желаемого и список
        продуктов, имеющихся в холодильнике. 
        Твоя задача - на основе этих данных составить рекомендации
        для владельца холодильника, какие недостающие продукты надо 
        закупить, чтобы владелец мог приготовить желаемое блюдо.
        Правила:
            -возвращай только список продуктов, которые нужно закупить.
            -не возвращай продукты, не имеющие отношения к данному блюду.
            -не возвращай продукты, которые уже есть в холодильнике.        
        `;
  } else {
    return `
        Ты - квалифицированный повар, определяющий инградиенты
        блюда по названию блюда. 
        Тебе дается название желаемого и список
        продуктов, имеющихся в холодильнике. 
        Твоя задача - на основе этих данных составить рекомендации
        для владельца холодильника, какие продукты надо 
        использовать из имеющихся в холодильнике, чтобы владелец мог 
        приготовить желаемое блюдо.
        Правила:
            -возвращай только список продуктов, которые нужно использовать
            из числа имеющихся в холодильнике.
            -не возвращай продукты, не имеющие отношения к данному блюду.
            -не возвращай продукты, которых нет в холодильнике.          
        `;
  }
}

// TODO
function createPrompt(basePrompt, dishTitle, availableProducts){
    const productsList = availableProducts.map(product => `${product.name} (количество: ${product.count}, цена: ${product.price}, срок годности: ${product.expDate})`).join(", ");
    return `${basePrompt}\n\nНазвание блюда: ${dishTitle}\nДоступные продукты: ${productsList}`;
}
async function askAi(promptText) {
  // Использовать только официальные имена моделей
  const models = ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-1.5-flash"];

  for (const modelName of models) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: promptText,
      });
      return response.text;
    } catch (error) {
      console.warn(`[Предупреждение] Модель ${modelName} недоступна (${error.status || error.message}), пробуем следующую...`);
    }
  }

  throw new Error("Не удалось получить ответ от моделей Gemini.");
}

async function main() {
  const user = {
    name: "Alex",
    role: "User",
  };

  const admin = {
    name: "John",
    role: "Admin",
  };

  const authenticatedUser = admin;


  // 1. Получаем продукты из холодильника
  const availableProducts = getProducts();

  // 2. Получаем базовый промпт для роли (Admin / User)
  const basePrompt = createBasePromptByRole(authenticatedUser);

  // 3. Составляем итоговый промпт под "борщ"
  const prompt = createPrompt(basePrompt, "борщ", availableProducts);

  // 4. Отправляем промпт Gemini и получаем ответ
  console.log("Отправка запроса в Gemini...");
  const aiResponse = await askAi(prompt);

  // 5. Выводим результат
  console.log("\n--- Ответ от Gemini ---");
  console.log(aiResponse);
}

main();