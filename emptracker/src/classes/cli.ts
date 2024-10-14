import inquirer from "inquirer";//import Inquirer
import {connectToDb } from '../database/connection.js';
await connectToDb();// Connect Database by calling function connectToDb
import Department from "./department.js"; //import Department class
import Role from "./role.js";// import Role Class
import Employee from "./employee.js";// import Employee Class
// Instances for Department,Role,Employee Classes
const departments = new Department();//
const role = new Role();
const employee = new Employee();

class Cli {
      
    exit: boolean = false;
    constructor(){

    }

    startCli():void{
        inquirer
        .prompt([
          {
            type: 'list',
            name: 'action',
            message: 'What you wana Do?',
            choices: [
              'View All Departments',
              'View All Roles',
              'View All Employees',
              'Add a Department',
              'Add a Role',
              'Add an Employee',    
              'Update an Employee Role',
              'Exit',
            ],
          },
        ])
        .then(async (answers) => {
          // perform the selected action
          if (answers.action === 'View All Departments') {
               await departments.viewAll(); // view All department list
                

           
          } else if (answers.action === 'View All Roles') {
            await role.viewAll(); // view All Roles list

    
          } else if (answers.action === 'View All Employees') {
            await employee.viewAll(); // view All Employee list
  
           
          } else if (answers.action === 'Add a Department') {

                   await  this.addDepartmentCli();// Prompt To Enter the Department name by calling function addDepartmentCli
                   this.exit = true; 

          } else if (answers.action === 'Add a Role') {
                const departmentList = await departments.viewAll();//fetching all departments from database
                this.addRoleCli(departmentList);// prompt to enter Role name salery and department from the list
                this.exit = true; 

            
          } else if (answers.action === 'Add an Employee') {
            const rolelist = await role.viewAll();//fetching all Roles from database
            const employeelist = await employee.viewAll();//fetching all Employees from database to select as manager for new employee
            this.addEmployeeCli(rolelist,employeelist);//Cli Prompt employee name ,role from list,manager from employee list
            this.exit = true; 
         

          } else if (answers.action === 'Update an Employee Role') {
            const roleList = await role.allRolesWithDepartment();//fetching all roles with their respective department name
            const employeeList = await employee.viewAll();//fetching all employees from database
            await this.UpdateRoleForEmployeeCli(roleList,employeeList);//prompt to slect employee from saved list and select role for selected employee to update.
            this.exit = true; 
          
           
          }  else {
            // Exit The Cli if the user selects exit
            this.exit = true;
          }

          if (!this.exit) {
            this.startCli();// 
          }
          
        });
    }
// prompt to Enter Department Name
    async addDepartmentCli():Promise<any>{   
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter Department Name',
            },
        ]).then(async (answers)=>{
           await departments.addDepartment(answers.name);//call (Departments class) function addDepartment to add department name 
           this.exit = false; 
           this.startCli();
        })
    }
    //prompt to enter Role Name, salary, department from the list
    async addRoleCli(dapartmentlist:any[]):Promise<any>{   
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter Role Name',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter Salary',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Select Department for the Role',
                choices: dapartmentlist.map((department) => {
                    return {
                      name: `${department.name}`,
                      value: department,
                    };
                  })
            }
        ]).then(async (answers)=>{
            // console.log(answers.department.name);
           await role.addRole(answers.name,answers.salary,answers.department);//adding new roll into database by calling function from class Role 
           this.exit = false; 
           this.startCli();
        })
    }
    // Prompt to enter employee name ,role and manager to select from list
    async addEmployeeCli(rolelist:any[],employeelist:any[]):Promise<any>{   
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstname',
                message: 'Enter Employee\'s First Name',
            },
            {
                type: 'input',
                name: 'lastname',
                message: 'Enter Employee\'s Last Name',
            },
            {
                type: 'list',
                name: 'role',
                message: 'Select The Role for Employee',
                choices: rolelist.map((role) => {
                    return {
                      name: `${role.title}`,
                      value: role,
                    };
                  })
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Select The Manager of Employee',
                choices: employeelist.map((employee) => {
                    return {
                      name: `${employee.firstname} ${employee.lastname}`,
                      value: employee,
                    };
                  })
            },
        ]).then(async (answers)=>{
            console.log(answers);
           await employee.addEmployee(answers.firstname,answers.lastname,answers.role,answers.manager);// Adding new employee into database by calling function from class employee
           this.exit = false; 
           this.startCli();
        })
    }
    async UpdateRoleForEmployeeCli(roleWithDepartmentlist:any[],employeelist:any[]):Promise<any>{   
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Select Employee To Change the Role For:',
                choices: employeelist.map((employee) => {
                    return {
                      name: `${employee.firstname} ${employee.lastname}`,
                      value: employee,
                    };
                  })
            },
   
            {
                type: 'list',
                name: 'role',
                message: 'Update The Role for Employee',
                choices: roleWithDepartmentlist.map((roleWithDepartment) => {
                    return {
                      name: `Role "${roleWithDepartment.title}" Under Department "${roleWithDepartment.name}" `,
                      value: roleWithDepartment,
                    };
                  })
            },
            
        ]).then(async (answers)=>{
            console.log(answers);
           await employee.updateEmployeeRole(answers.employee,answers.role);//updating role for employee in database by calling function from employee class 
           this.exit = false; 
           this.startCli();
        })
    }


}
export default Cli;