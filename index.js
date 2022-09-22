



const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./server.js");


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
            "View all Departments",
            "View all Roles",
            "View all Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role",
            // "Update Employee Managers",
            // "View Employees by Manager",
            // "View Employees by Department",
            // "Delete a Department",
            // "Delete a Role",
            // "Delete an Employee",
            // "View a Departments Budget",
            // "EXIT"
        ]


    })


        .then(function (answers) {
            switch (answers.action) {
                case "View all Departments":
                    viewDepartments();
                    break;
                case "View all Roles":
                    viewRoles();
                    break;
                case "View all Employees":
                    viewEmployees();
                    break;
                case "Add a Department":
                    addDepartment();
                    break;
                case "Add a Role":
                    addRole();
                    break;
                case "Add an Employee":
                    addEmployee();
                    break;
                case "Update an Employee Role":
                    updateRole();
                    break;
                // case "Update Employee Managers":
                //     updateEmployeeManagers();
                //     break;
                // case "View Employees by Manager":
                //     viewEmployeeByManager();
                //     break;
                // case "View Employees by Department":
                //     viewEmployeesByDepartment();
                //     break;
                // case "Delete a Department":
                //     deleteDepartment();
                //     break;
                // case "Delete a Role":
                //     deleteRole();
                //     break;
                // case "Delete an Employee":
                //     deleteEmployee();
                //     break;
                // case "View a Departments Budget":
                //     viewDepartmentsBudget();
                //     break;
                // case "EXIT":
                //     exitApp();
                //     break;
                default:
                    break;

            }
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


function viewEmployees() {
    var query = "SELECT * FROM employees";
    connection.query(query, function (err, response) {
        if (err) throw err;
        console.log(response.length + "employees found");
        console.table("All Employees:", response);
        options();
    })
};




function addDepartment() {
    inquirer.prompt([
        {
            name: "newDepartment",
            type: "input",
            message: "What's the name of the department would you like to add?"
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
                        departmentArray.push({name:response[i].name, value: response[i].id});
                    }

                    return departmentArray;

                },
            }
        ])

            .then(function (answers) {
               

                connection.query("INSERT INTO role SET ?",
                    {
                        title: answers.new_role,
                        salary: answers.salary,
                        department_id: answers.Department
                    },

                    function (err, response) {
                        if (err) throw err;
                        console.log("Your new role has been added");
                        console.table("All Roles:", response);
                        options();

                    })
            })
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

                connection.query("INSERT INTO employees SET ?", {

                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    manager_id: answers.manager_id,
                    role_id: role_id,

                },

                    function (err) {
                        if (err) throw err;
                        console.log("Your new employee has been added");
                        console.table("All Employees:", response);
                        options();

                    })

            })
    })
};




function updateRole() {
    connection.query("SELECT * FROM employees, role WHERE role.id = employees.role_id", function (err, response) {
        if (err) throw err;
        
        inquirer.prompt([
            {
                name: "employees",
                type: "list",
                message: "Which employee role do you want to update?",
                choices: function () {
                    var employeesArray = [];
                    for (let i = 0; i < response.length; i++) {
                        employeesArray.push({name:`${response[i].first_name} ${response[i].last_name}`, value: response[i].id});
                    }
                    return employeesArray;
                },
            },
           
            
            {
                name: "roles",
                type: "list",
                choices: function () {
                    var rolesArray = [];
                    for (let i = 0; i < response.length; i++) {
                        rolesArray.push({name:response[i].title, value: response[i].id});
                    }

                    return rolesArray;

                },
            },
           
           
        ])
        
        .then(function (answers) {
           
                    
                    connection.query(`UPDATE employees SET role_id = "${answers.roles}" WHERE id = "${answers.employees}"`,
                   
                    
                    function (err, response) {
                        if (err) throw err;
                        console.log("Your employee's new role has been updated");
                        console.table("All Roles:", response);
                        options();
                        
                    })
                })
            })
        };
        


// function updateEmployeeManagers() {
        
 // };


// function viewEmployeeByManager(){

// };


// function viewEmployeeByDepartment() {

// };


// function deleteDepartment() {

// };


// function deletRole() {

// };


// function deleteEmployee() {

// };


// function viewDepartmentBudget() {

// };


// function exitApp() {

// };







