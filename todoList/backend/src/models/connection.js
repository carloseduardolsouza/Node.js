//conection com banco de dados

const mysql = require("mysql2/promise");

//require('dotenv').config()

const connection = mysql.createPool({
  host: "localhost:3306",
  user: "root",
  password: "root",
  database: "todolist",
});

module.exports = connection;
