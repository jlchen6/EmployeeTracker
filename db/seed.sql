-- Set up initial table data ahead of time

-- Drop database if already exists
DROP DATABASE IF EXISTS employees_db;
-- Create database
CREATE DATABASE employees_db;
-- Use the created database for the following queries
USE employees_db;
-- Create tables
-- Department table. Has two columns, id, and name. ID is the primary key
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id),
)

-- Role table. Has 4 columns; id(primary key), title, salary, and department id
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    departmentID INT,
    PRIMARY KEY (id)
)

-- Employee table. Has 5 columns; id(primary key), first name, last name, role id, and manager id.

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    roleID INT,
    managerID INT,
    PRIMARY KEY (id)
)