import { pool } from '../database/connection.js';


class Employee {
        constructor(){

        }

        async viewAll():Promise<any>{

            // console.log('all departments here in the table soon ...');
            try{
                const res =  await pool.query('SELECT first_name as FirstName,last_name as LastName,title as role,name as department FROM employee join role on role.id = employee.role_id join department on role.department_id = department.id');
                console.table(res.rows);
            }catch(err){
                console.log(err);
            }

        }
       async addEmployee(name:string):Promise<any>{

           try{
               const res =  await pool.query(`INSERT INTO role(title,)VALUES($1)`,[name]);
            //    console.table(res.rowCount);
               console.log(`Row Inserted ${res.rowCount}`);
               console.log('Added Department is '+ name);
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