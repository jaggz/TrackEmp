import inquirer from "inquirer";
import Departments from "./departments.js";
const departments = new Departments();


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

    
          } else if (answers.action === 'View All Employees') {
  
           
          } else if (answers.action === 'Add a Department') {

                   await  this.addDepartmentCli();// Prompt To Enter the Department name
                   this.exit = true; 

          } else if (answers.action === 'Add a Role') {
            
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


}
export default Cli;