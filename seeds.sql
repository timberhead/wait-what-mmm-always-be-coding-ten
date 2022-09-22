



USE employees_db;


INSERT INTO department (name)
VALUES
("Information Systems and Technologies"),
("Finance"),
("Legal"),
("Human Resources"),
("Engineering"),
("Sales"),
("Research");


INSERT INTO role (title, salary, department_id)
VALUES
("Web Developer", 90000, 1),
("Accountant", 70000, 2),
("Lawyer", 250000, 3),
("Manager", 70000, 4),
("Engineer", 1200000, 5),
("Sales", 40000000, 6),
("Laboratory Test Subject", 52, 7);


INSERT INTO employees (first_name, last_name, role_id, manager_id, update_role)
VALUES
("Jimmys", "Johns", 1, 4),
("Dave", "Thomas", 2, 4),
("Ray", "Kroc", 3, 4),
("Colonel", "Sanders", 4, NULL),
("Jack", "Box", 5, 4),
("Martha", "Stewart", 6, 4),
("Jared", "Fogle", 7, 4);
