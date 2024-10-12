create database employeeData_db; --creating database
--creating Table department
create table department(

id SERIAL PRIMARY KEY,

name VARCHAR(30) UNIQUE NOT NULL
)


-- creatign Table role
create table role(

id SERIAL PRIMARY KEY,

title VARCHAR(30) UNIQUE NOT NULL ,

salary DECIMAL NOT NULL ,

department_id INTEGER NOT NULL,

  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
  
)
-- Creating Table Employee 
create table employee(

id SERIAL PRIMARY KEY,

first_name VARCHAR(30) NOT NULL,

last_name VARCHAR(30) NOT NULL, 

role_id INTEGER NOT NULL,

manager_id INTEGER,

  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL,
  
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL

)