type MovieType = {
    popularity: number;
    vote_average: number;
    vote_count: number;
    overview: string;
    title: string;
}

type MovieProps = { movie: MovieType };

export function Movie({ movie }: MovieProps) {
  const {
    popularity, vote_average, vote_count, overview, title
  } = movie;
  return <li className="movie"
    data-popularity={popularity}
    data-vote-average={vote_average}
    data-vote-count={vote_count}
    title={overview}>{title}</li>

}
