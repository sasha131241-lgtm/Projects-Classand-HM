const user={
    name:"Alex",
    role:"User",
    password:"12345"
};

const admin={
    name:"John",
    role:"Admin",
    password:"admin123"
}

const authenticateUser= user;

if (authenticateUser.role === "Admin") {
    console.log( "Удлаение данных разрешено");    
} else {
    console.log("У вас нет прав для удаления данных");
}
