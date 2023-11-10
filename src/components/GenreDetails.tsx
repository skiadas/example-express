import { useState } from "react";
import { Movie } from "./Movie";
import { GenreType } from "./Genre";
import {movies as allMovies} from '../data/movies.json';

export type GenreProps = {
  genre?: GenreType
};
export default function GenreDetails({ genre }: GenreProps) {
  const [popularityCutoff, setPopularityCutoff] = useState<number>(100);
  if (!genre) return <p>Please select a genre!</p>;
  const movies =
    allMovies
      .filter(m => m.genre_ids.includes(genre.id))
      .filter(m => m.popularity >= popularityCutoff);

  return (
  <>
    <h2>{genre.name}</h2>
    <label>Movies in Genre: <span>{movies.length}</span></label>
    <br />
    <label>Average popularity: <span id="avgPopularity">{computePopularity(movies)}</span></label>
    <br />
    <label>Popularity cutoff:
      <input type="number"
            id="popularityCutoff"
            value={popularityCutoff}
            onChange={ev => setPopularityCutoff(Number(ev.target.value))} />
    </label>
    <ul id="movieList">
      {movies.map((m, i) => <Movie key={i} movie={m} />)}
    </ul>
  </>
  );
}

function computePopularity(movies: Array<{ popularity: number }>): number {
  if (movies.length == 0) return 0;
  const totalPopularity = movies.map(({popularity}) => popularity)
            .reduce((x,y) => x+y);
  return totalPopularity / movies.length;
}
