-- Structured Query Language, query-line of sql code
-- This creates a new database with the given name
CREATE DATABASE IF NOT EXISTS happyduck_data;

-- Switch to this database
USE happyduck_data;

-- Creates the department table
CREATE TABLE IF NOT EXISTS departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

-- Creates the roles table
CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    salary INT,
    department_id INT
);

-- Creates the employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INT,
    manager_id INT
);

-- Queries that will do CRUD (CREATE, READ, UPDATE, DELETE) operations

-- View all departments
SELECT * FROM departments;

-- View all role
SELECT  * FROM roles
-- View all employees
SELECT * FROM employees;

-- Add a department
INSERT INTO departments (name) VALUES ('YourDepartmentName');

-- Add a role
INSERT INTO roles (title, salary, department_id) VALUES ('YourTitle', 50000, 1);

-- Add an employee
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, 1);

-- Update an Employee role
UPDATE employees SET role_id = 70 WHERE first_name = 'Rosa';

-- Delete an employee (assuming you want to delete based on the first name)
DELETE FROM employees WHERE first_name = 'EmployeeFirstName';

-- Write Inner and Outer Joins, Full Join <- Not used often 
