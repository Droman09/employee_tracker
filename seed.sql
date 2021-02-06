INSERT INTO department (name) 
values ("Sales"), ("Engineer"),("Finance"),("Legal");

INSERT INTO role (title, salary, department_id ) 
values 
('Sales Lead', 100000.00, 1),
('Salesman', 80000.00, 1),
('Lead Engineer', 150000.00, 2),
('Software Engineer', 100000.00, 2),
('Account Manager', 150000.00, 3),
('Accountant', 100000.00, 3),
('Legal Team Lead', 200000.00, 4),
('Lawyer', 150000.00, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id) 
values 
('Blake', 'Daves', 1, NULL),
('Carly', 'Wheatly', 2, 1),
('Atwater', 'Carlson', 3, NULL),
('Lee', 'Quinn', 4, 2),
('Julia', 'Strickland', 5, NULL),
('Adrian', 'Woods', 6, 3),
('Alexis', 'Hum', 7, NULL);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;



