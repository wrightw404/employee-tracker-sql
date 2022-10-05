DROP DATABASE IF EXISTS employeeTracker_db; 
CREATE DATABASE employeeTracker_db; 

USE employeeTracker_db; 

CREATE TABLE department (
    department_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL 
);
CREATE TABLE role (
    role_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    INDEX department_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(department_id)
);
CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    INDEX role_ind (role_id),
    manager_id INT NULL,
    INDEX manager_ind (manager_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(role_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(employee_id)
);