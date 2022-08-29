DROP DATABASE IF EXISTS employee_database;
CREATE DATABASE employee_database;

USE employee_db;

CREATE TABLE 
departments 
(
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(50) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE 
roles 
(
    id SERIAL NOT NULL,
    title_name VARCHAR(50) NOT NULL,
    salary DECIMAL (10.3) NULL,
    departments_id INT NUll,
    PRIMARY KEY (id)
 );

 CREATE TABLE 
 employees 
 (
     id INT NOT NULL AUTO_INCREMENT,
     first_name VARCHAR(30) NULL,
     last_name VARCHAR(30) NULL,
     roles_id INT NULL,
     manager_id INT NULL,
     PRIMARY KEY (id)
 );