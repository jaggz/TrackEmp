import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './database/connection.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());





app.get('/api/movies',(_req,res)=>{

  pool.query('SELECT * FROM movies', (err: Error, result: QueryResult) => {
    if (err) {
      // console.log(err);
      res.status(400).json({error:err});
    } else if (result) {
      // console.log(result.rows);
      res.send(result.rows);
    }
  });
});
app.get('/api/movie-reviews',(_req,res)=>{

    pool.query('SELECT movie_name, review FROM movies JOIN reviews ON movies.id = reviews.movie_id', (err: Error, result: QueryResult) => {
      if (err) {
        // console.log(err);
        res.status(400).json({error:err});
      } else if (result) {
        // console.log(result.rows);
        res.send(result.rows);
      }
    });
});
app.post('/api/add-movie',({body},res)=>{

  pool.query('INSERT INTO movies (movie_name) values($1)',[body.movie_name], (err: Error, result: QueryResult) => {
    if (err) {
      // console.log(err);
      res.status(400).json({error:err});
    } else if (result) {
      // console.log(result.rows);
      res.send(body);
    }
  });
});
app.delete('/api/movie/:id',(req,res)=>{

  pool.query('DELETE FROM movies WHERE id = $1',[req.params.id], (err: Error, result: QueryResult) => {
    if (err) {
      // console.log(err);
      res.status(400).json({error:err});
    } else if (result) {
      // console.log(result.rows);
      res.send(`deleted Movie :${req.params.id}`);
    }
  });
});

// Default response for any other request (Not Found)
app.use((_req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
