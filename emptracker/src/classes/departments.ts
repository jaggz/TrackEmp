// import { QueryResult } from 'pg';
import { pool, connectToDb } from '../database/connection.js';
await connectToDb();

class Departments {
        constructor(){

        }

        async viewAll():Promise<any>{


            // console.log('all departments here in the table soon ...');
       
            try{
                const res =  await pool.query('SELECT * FROM department');
                console.table(res.rows);
            }catch(err){
                console.log(err);
            }

        }
       async addDepartment(name:string):Promise<any>{


           
           try{
               const res =  await pool.query(`INSERT INTO department(name)VALUES($1)`,[name]);
            //    console.table(res.rowCount);
               console.log(`Row Inserted ${res.rowCount}`);
               console.log('Added Department is '+ name);
            }catch(err){
                console.log(err);
            }

        }
        deleteDepartment(id:number):void{


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
export default Departments;