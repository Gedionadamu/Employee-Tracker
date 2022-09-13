INSERT INTO 
employees 
(id, first_name, last_name, roles_id, manager_id)
VALUES 
(1,'Gedion', 'Adamu', 1, 0),
(2, 'Siman', 'Ali', 5, 2),
(3, 'Jhon', 'doe', 5, 1),
(4, 'lola', 'Milan', 3, 3),
(5, 'Kerry', 'Underwood', 7, 5);



INSERT INTO 
departments 
(id, department_name)
VALUES 
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');


INSERT INTO 
roles 
(id, title_name, salary, departments_id)
VALUES 
(1, 'Principal Director', 100000, 1),
(2, 'Head of Legal Sevices', 90000, 1),
(3, 'Head Accounting', 80000, 2),
(4, 'Operations Manager', 75000, 1),
(5, 'Head of research and development', 75000, 2),
(6, 'Reference Librarian', 75000, 3),
(7, 'Library Clerk', 40000, 4);