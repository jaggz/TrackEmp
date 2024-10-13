import { pool } from '../database/connection.js';


class Employee {
        constructor(){

        }

        async viewAll():Promise<any>{

            // console.log('all departments here in the table soon ...');
            try{
            
                const res =  await pool.query('SELECT emp.id,emp.first_name AS firstname,emp.last_name AS lastname , salary,title as role,name as department , mng.first_name AS manager FROM role join employee emp on role.id = emp.role_id join department on role.department_id = department.id left JOIN Employee mng ON emp.manager_id = mng.id');
               console.table(res.rows);
      
                return res.rows;
            }catch(err){
                console.log(err);
            }

        }
       async addEmployee(firstname:string,lastname:string,role:any,manager:any):Promise<any>{

           try{
                const res =  await pool.query(`INSERT INTO employee(first_name,last_name,role_id,manager_id)VALUES($1,$2,$3,$4)`,[firstname,lastname,role.id,manager.id]);
            
                console.log(`Row Inserted ${res.rowCount}`);
                console.log(`Employee Name"${firstname+lastname} added with role ${role.title} under manager ${manager.lastname} `);
            }catch(err){
                console.log(err);
            }

        }
       async updateEmployeeRole(employee:any,role:any){
            try{
                const res =  await pool.query(`update employee set role_id = $1 where id = $2`,[role.id,employee.id]);
            
                console.log(`Row Updated ${res.rowCount}`);
                console.log(`Role ${role.title} Under manager ${role.name} is Updated For Employee Name "${employee.firstname} ${employee.lastname} !! `);
            }catch(err){
                console.log(err);
            }
       }

        deleteRole(id:number):void{


            console.log('Delete departments here in the table soon ...');

            // pool.query('SELECT * FROM movies', (err: Error, result: QueryResult) => {
            //     if (err) {
            //       console.log(err);            
            //     } else if (result) {
            //       console.table(result.rows);            
            //     }
            //   });
        }





}
export default Employee;