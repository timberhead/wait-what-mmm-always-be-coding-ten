



const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "",
    database: "employees_db"

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


        .then(function (answers) {
            switch (answers.action) {
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
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.log(response.length + "employee found");
        console.table("All Employees:", response);
        options();
    })
};


function viewDepartments() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.table("All Departments:", response);
        options();
    })
};


function viewRoles() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.table("All Roles", response);
        options();
    })
};


function addEmployee() {
    connection.query("SELECT * FROM role", function (err, response) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
                name: "manager_id",
                type: "input",
                message: "What is the employee's manager's id number?"
            },
            {
                name: "role",
                type: "list",
                choices: function () {
                    var roleArray = [];
                    for (let i = 0; i < response.length; i++) {
                        roleArray.push(response[i].title);
                    }
                    return roleArray;
                },
                message: "What is this employee's role?"
            }

        ])
            .then(function (answers) {
                let role_id;
                for (let a = 0; a < response.length; a++) {
                    if (response[a].title === answers.role) {
                        role_id = response[a].id;
                        console.log(role_id);
                    }

                }

                connection.query("INSERT INTO employee SET ?", {

                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    manager_id: answers.manager_id,
                    role_id: role_id,

                },

                    function (err) {
                        if (err) throw err;
                        console.log("Your new employee has been added!");
                        options();

                    })

            })
    })
};


function addDepartment() {
    inquirer.prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "Which department would you like to add?"
        }
    ])
        .then(function (answers) {
            connection.query("INSERT INTO department SET ?",
                {
                    name: answers.newDepartment
                });

            var query = "SELECT * FROM department";
            connection.query(query, function (err, response) {
                if (err) throw err;
                console.log("Your new department has been added!");
                console.table("All departments:", response);
                options();

            })
        })
};


function addRole() {
    connection.query("SELECT * FROM department", function (err, response) {
        if (err) throw err;

        inquirer.prompt([
            {
                name: "new_role",
                type: "input",
                message: "What new role would you like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role? (Enter an Amount)"
            },
            {
                name: "Department",
                type: "list",
                choices: function () {
                    var departmentArray = [];
                    for (let i = 0; i < response.length; i++) {
                        departmentArray.push(response[i].name);
                    }

                    return departmentArray;

                },
            }
        ])

            .then(function (answers) {
                let department_id;
                for (let a = 0; a < response.length; a++); {
                    if (response[a].name === answers.Department) {
                        department_id = response[a].id;
                    }
                }

                connection.query("INSERT INTO role SET ?",
                    {
                        title: answers.new_role,
                        salary: answers.salary,
                        department_id: department_id
                    },

                    function (err, response) {
                        if (err) throw err;
                        console.log("Your new role has been added!");
                        console.table("All Roles:", response);
                        options();

                    })
            })
    })
};


function updateRole() {

};


function deleteEmployee() {

};


function exitApp() {

};







