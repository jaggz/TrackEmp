import { QueryResult } from 'pg';
import { pool, connectToDb } from '../database/connection.js';




class Departments {
        constructor(){

        }

        viewAll():void{


            console.log('all departments here in the table soon ...');

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