const dataBase = require("mysql2/promise")

const conected = dataBase.createPool({
    host: "localhost:3306",
    user: "root",
    password: "root",
    database: "loja_online",
})

module.exports = conected;