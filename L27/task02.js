//1.Моя аппликация
function deleteProduct(productTitle, user){
    if (canDelete(user)) {
        console.log(`Продукт ${productTitle} удален`);
    } else{
        console.log("У вас нет прав для удаления данных");
    }
}
// 2.Иммитация стороннего фреймворка для 
// авторизации и аутентификации пользователей

function canDelete(user){
    return user.role === "admin";
}

// 3. Иммитация БД

const user={
    name:"Alex",
    role:"User",
};

const admin={
    name:"John",
    role:"Admin",
};

// ВЫЗОВ МОЕЙ АПЛИКАЦИИ

deleteProduct("Banana", user);// user не может удалять
deleteProduct("Apple", admin);// admin может удалять