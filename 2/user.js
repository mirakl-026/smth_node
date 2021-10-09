const user = {
    name: "Elena",
    age: 25
};

// module.exports = user;


//Можно заносить большее кол-во данных
module.exports = {
    user: user,
    sayHello: function() {
        console.log("Hello");
    }
}
