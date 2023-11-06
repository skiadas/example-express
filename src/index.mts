import express from 'express';
import pretty from 'express-prettify';
import random from 'random';
import {readFile} from 'fs';
import {movies} from './movies.json';
import {genres} from './genres.json';

const port = 5004;
const app = express();

app.use((req, res, next) => {
  console.log(req.path);
  next();
});
app.use(pretty({ query: 'pretty' }));
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})
