import { pool} from '../database/connection.js';


class Role {
        constructor(){

        }

        async viewAll():Promise<any>{

   
            try{
                const res =  await pool.query('SELECT title,salary,department.name,role.id FROM role join department on role.department_id = department.id;');
                console.table(res.rows,['title','salary','name']);
                return res.rows;
            }catch(err){
                console.log(err);
            }

        }
       async addRole(title:string,salary:number,department:any):Promise<any>{

           try{
               const res =  await pool.query(`insert into role (title,salary,department_id)values($1,$2,$3)`,[title,salary,department.id]);
            //    console.table(res.rowCount);
               console.log(`Row Inserted ${res.rowCount}`);
               console.log('The Role "'+ title +'" is added under Department '+department.name);
            }catch(err){
                console.log(err);
            }

        }
        async allRolesWithDepartment():Promise<any>{

            try{
                const res =  await pool.query(`select role.id , title,salary,department_id , name from role join department on role.department_id = department.id`);
                return res.rows;
             }catch(err){
                 console.log(err);
             }
 
         }
 

        deleteRole(id:number):void{


            console.log('Delete departments here in the table soon ...');


        }





}
export default Role;