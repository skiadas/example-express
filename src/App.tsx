// Structure taken from: https://github.com/gihanrangana/vite-express-ssr-ts
import GenreList from './components/GenreList'
import GenreDetails from './components/GenreDetails'
// import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react';
import {genres} from './data/genres.json';

function App() {
  const [currentGenreId, setCurrentGenreId] = useState<number|null>(null);
  const currentGenre = genres.find(({ id }) => currentGenreId == id);

  return (
    <>
      <section id="genres" style={{width: "50%"}}>
        <GenreList genres={genres} onSelect={(id: number) => setCurrentGenreId(id)} />
      </section>
      <section id="movies" style={{width: "50%"}}>
        <GenreDetails genre={currentGenre} />
      </section>
    </>
  )
}

export default App
