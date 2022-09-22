



const mySql = require("mysql2");


const connection = mySql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employees_db"

});



module.exports = connection;