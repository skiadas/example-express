import Genre from './Genre';
import './GenreList.css';
import type {GenreType} from './Genre';

export type GenreArray = Array<GenreType>;

function GenreList({genres, onSelect }: { genres: GenreArray, onSelect: (id: number) => void }) {
  const genreEntries = genres.map(g => <Genre id={g.id} name={g.name} key={g.id} onSelect={onSelect} />);
  return (
    <>
      <h2>All the genres</h2>
      <ul id="genresList">
        {genreEntries}
      </ul>
    </>
  );
}

export default GenreList;
