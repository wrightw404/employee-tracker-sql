USE employeeTracker_db 

INSERT INTO department (name)
VALUES ('Front of House'), ('Back of House'), ('Human Resources'), ('IT'), ('Executive')

INSERT INTO role (title, department_id, salary)
VALUES ('Chief Executive Officer', 5, 500000)
('Senior Analyst', 5, 125000)
('Programmer', 4, 100000)
('Jr. Developer', 4,  75000)
('HR Assistant', 3,  50000)
('Executive Chef', 2,  60000)
('Sous Chef', 2,  45000)
('General Manager', 1,  70000)
('Reception', 1,  35000)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Brandon', 'Beane', 5, NULL),
('Sean', 'McDermott', 5, NULL),
('Josh', 'Allen', 4, 5),
('Stefon', 'Diggs', 4, 5),
('Tyler', 'Bass', 3, 5),
('Micah', 'Hyde', 2, 5),
('Jordan', 'Poyer', 2, 5),
('Dawson', 'Knox', 1, 5),
('TreMaine', 'Edmunds', 1, 5),

