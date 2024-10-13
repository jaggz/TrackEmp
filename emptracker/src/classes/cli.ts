import inquirer from "inquirer";
import {connectToDb } from '../database/connection.js';
await connectToDb();
import Department from "./department.js";
import Role from "./role.js";
import Employee from "./employee.js";
const departments = new Department();
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

                   await  this.addDepartmentCli();// Prompt To Enter the Department name
                   this.exit = true; 

          } else if (answers.action === 'Add a Role') {
                const departmentList = await departments.viewAll();
                this.addRoleCli(departmentList);
                this.exit = true; 

            
          } else if (answers.action === 'Add an Employee') {
         
          } else if (answers.action === 'Update an Employee Role') {
          
           
          }  else {
            // exit the cli if the user selects exit
            this.exit = true;
          }

          if (!this.exit) {
            this.startCli();
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
                choices: dapartmentlist.map((department,index) => {
                    return {
                      name: `${department.name}`,
                      value: department,
                    };
                  })
            }
        ]).then(async (answers)=>{
            // console.log(answers.department.name);
           await role.addRole(answers.name,answers.salary,answers.department);//call (Departments class) function addDepartment to add department name 
           this.exit = false; 
           this.startCli();
        })
    }


}
export default Cli;