import express from 'express';
import pretty from 'express-prettify';
import random from 'random';
import {readFile} from 'fs';
import {movies} from './movies.json';
import {genres} from './genres.json';
import { create } from 'express-handlebars';

const port = 5004;
const app = express();

const hbs = create({ 
  // config here
 });

app.use((req, res, next) => {
  console.log(req.path);
  next();
});
app.use(pretty({ query: 'pretty' }));
app.use(express.static('public'));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('home', { 
    genres, 
    helpers: {
      link: (path) => path
    }
  });
});

app.get('/genre/:id', (req, res) => {
  const givenId = Number(req.params.id);
  let selectedGenre = genres.find((g) => g.id == givenId);
  if (!selectedGenre) return res.sendStatus(404);
  const layout = "fragment" in req.query ? false : "main";
  res.render('genre', {
    genres, 
    selectedGenre,
    movies: movies.filter(m => m.genre_ids.includes(givenId)),
    helpers: {
      link: (path) => "../" + path
    },
    layout
  })
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
})
