



const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "",
    database: "employee_db"

})


connection.connect(function (err) {
    if (err) throw err;
    options();
})


function options() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Welcome to your employee database. Choose one of the following options.",
        choices: [
            "View all Employees",
            "View all Departments",
            "View all Roles",
            "Add an Employee",
            "Add a Department",
            "Add a Role",
            "Update an Employee Role",
            "Delete an Employee",
            "EXIT"
        ]

    })


        .then(function (answer) {
            switch (answer.action) {
                case "View all Employees":
                    viewEmployees();
                    break;
                case "View all Departments":
                    viewDepartments();
                    break;
                case "View all Roles":
                    viewRoles();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Update an Employee Role":
                    updateRole();
                    break;
                case "Delete an Employee":
                    deleteEmployee();
                    break;
                case "EXIT":
                    exitApp();
                    break;
                default:
                    break;

            }
        })

};


function viewEmployees() {
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, response) {
        if (err) throw err;
        console.log(response.length + "employee found");
        console.table("All Employees:", response);
        options();
    })
};


function viewDEpartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, response) {
        if (err) throw err;
        console.table("All Departments:", response);
        options();
    })
};


function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function(err, response) {
        if (err) throw err;
        console.table("All Roles", response);
        options();
    })
};



















