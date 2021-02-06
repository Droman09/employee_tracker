DROP DATABASE IF EXISTS emp_trackerDB;
CREATE database emp_trackerDB;

USE emp_trackerDB;

CREATE TABLE department (
	id INT AUTO_INCREMENT NOT NULL,
	name VARCHAR(30) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT AUTO_INCREMENT NOT NULL ,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL(10,2), 
	department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
	id INT AUTO_INCREMENT NOT NULL, 
    first_name VARCHAR(30),
    last_name VARCHAR(30), 
    role_id INT NOT NULL, 
    manager_id INT NULL,
    PRIMARY KEY(id)
);