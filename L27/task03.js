function updateProduct(product, newPrice, user) {
    if (canUpdate(user)) {
        product.price = newPrice;
    } else {
        console.log("Операция не разрешена.");
    }
}

function canUpdate1(user) { // версия 1 самая неудачная
    if (user.role === "Admin") {
        return true;
    }
    if (user.role === "manager"){ 
        return true;
    }
    return false;
}    

function canUpdate2(user) { // версия 2 чуть получше
    if (user.role === "Admin" || user.role === "Manager") {
        return true;
    }
    return false;
}    

function canUpdate(user) { // версия 3 самая удачная
    return ['Admin', 'Manager'].includes(user.role);
}
    
    const user={
    name:"Alex",
    role:"User",
};

const admin={
    name:"John",
    role:"Admin",
};

const manager={
    name:"Kate",
    role:"Manager",
};

const product = {
    title: "Banana",
    price: 1.2,
};

console.log(product)
updateProduct(product, 2.1, manager);
console.log(product)