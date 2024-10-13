--polpulate tables
--table department
insert into department (name)
values
('Information Technology'),
('Loss Prevention'),
('Safety Department'),
('Packaging Department'),
('Security Deparment');

-- table role
insert into role (title,salary,department_id)values
('supervisor',10000,1),
('QA Tester',7000,4),
('Security Guard',5000,5);

--table Employee
insert into employee (first_name,last_name,role_id,manager_id) values
('balsher','sran',1,null),
('josh','cordial',2,1);