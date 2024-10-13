--select employees data
select * from employee;

--getting data from three tables employee, role, departments with join clause
SELECT first_name as FirstName,last_name as LastName,name as department FROM employee join role on role.department_id = employee.role_id
 join department on department.id =role.department_id;

-- query to get data from employee,role,department tables along with manager name within employee table (self join using alias name)
SELECT salary,emp.first_name AS employee ,mng.first_name AS manager,title as role,name as department FROM role 
 join employee emp on role.id = emp.role_id 
join department on role.department_id = department.id
JOIN Employee mng ON emp.manager_id = mng.id 

-- select * from employee  where manager_id = employee.id
-- SELECT emp.first_name AS employee, mng.id AS managerID
-- FROM Employee emp
-- left JOIN Employee mng ON  emp.manager_id = mng.id 

--gettign data for role associate with department table using join clause
select * from role join department on role.department_id = department.id