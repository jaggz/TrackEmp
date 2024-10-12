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
            message: 'Select an action',
            // TODO: add options to tow and wheelie
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
        .then((answers) => {
          // perform the selected action
          if (answers.action === 'View All Departments') {
                departments.viewAll(); // view All department list

           
          } else if (answers.action === 'View All Roles') {

    
          } else if (answers.action === 'View All Employees') {
  
           
          } else if (answers.action === 'Add a Department') {
                    this.addDepartmentCli(); // addDepartmentCli to Enter the Department name
         
 
          } else if (answers.action === 'Add a Role') {
            
          } else if (answers.action === 'Add an Employee') {
         
          } else if (answers.action === 'Update an Employee Role') {
          
           
          }  else {
            // exit the cli if the user selects exit
            this.exit = true;
          }
          if (!this.exit) {

          }
        });
    }
// prompt to Enter Department Name
    addDepartmentCli():void{   
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter Department Name',
            },
        ]).then((answers)=>{
            departments.addDepartment(answers.name);//call Departments class function addDepartment to add department name 
        })
    }


}
export default Cli;