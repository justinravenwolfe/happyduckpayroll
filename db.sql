-- This creates a new database with the given name
CREATE DATABASE IF NOT EXISTS happyduck_data; 

-- Switch to this database
USE happyduck_data;

-- Make three tables


-- Department
-- 1, 2, 3...
-- Creates the department table
-- __________
--  Dept
-- _________
-- id: 1
-- name: Procurement 
CREATE TABLE IF NOT EXISTS departments(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

-- Role
-- Syntax <- Grammar of programming
CREATE TABLE IF NOT EXISTS roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    salary INT,
    department_id INT
);

-- Employees 
-- first_name <- varchar()
-- last_name <- varchar()
-- manager_id <- INT
CREATE TABLE IF NOT EXISTS employees(
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INT,
    manager_id INT  
);
--Queries that will do CRUD>CREATE, READ, UPDATE, DELETE operations

--View all departments
--Go into the departments table and select all the rows and print them
SELECT * FROM departments; 

--View all roles
SELECT * FROM roles;

--View all employees
SELECT * FROM employees;s

--CREATE TABLE IF NOT EXISTS departments(
   -- id INT PRIMARY KEY AUTO_INCREMENT,
   --name VARCHAR(255)
--);
--Add a department
INSERT INTO departments (name) VALUES ?; --Specify Department


--CREATE TABLE IF NOT EXISTS roles(
    --id INT PRIMARY KEY AUTO_INCREMENT,
    --title VARCHAR(255),
    --salary INT,
    --department_id INT
--);
--Add a role
INSERT INTO roles (title, salary, department) VALUES (?,?,?); --Specifiy specific values

--CREATE TABLE IF NOT EXISTS employees(
    --id INT PRIMARY KEY AUTO_INCREMENT,
    --first_name VARCHAR(255),
    --last_name VARCHAR(255),
    --role_id INT,
    --manager_id INT  
--);
--Add an employee

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?, ?); --Specifiy specific values

--CREATE TABLE IF NOT EXISTS employees(
    --id INT PRIMARY KEY AUTO_INCREMENT,
    --first_name VARCHAR(255),
    --last_name VARCHAR(255),
    --role_id INT,
    --manager_id INT  
--);
--Update an Employee role

UPDATE employees WHERE first_name == ? (role_id) VALUES ?; --?- ROSA, ? -- 70 (executive assistant)

--Need delete query