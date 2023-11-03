import express from 'express';
import pretty from 'express-prettify';
import random from 'random';
import {movies} from './movies.json';
import {genres} from './genres.json';

const port = 5004;
const app = express();

app.use(pretty({ query: 'pretty' }));
app.get("/", (req, res) => {
  res.send(`<a href="./roll">Roll!</a>`);
});
app.get("/roll", (req, res) => {
  if (req.query.max) {
    res.send({ roll: random.int(Number(req.query.max)) });
  }
  res.send({ roll: random.int(6) });
})
app.get("/genre", (req, res) => {
  res.json(genres);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})
