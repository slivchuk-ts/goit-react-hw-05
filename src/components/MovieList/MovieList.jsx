import { useEffect, useState } from 'react';
import s from './MovieList.module.css'
import { Link, useLocation } from 'react-router-dom';



const MovieList = ({ movies, onMovieClick }) => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searched, setSearched] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    if (movies.length) {
      const moviesWithPosters = movies.filter((movie) => movie.poster_path);
      setFilteredMovies(moviesWithPosters);
      setSearched(true);
    }
  }, [movies]);

  if (searched && !filteredMovies.length) return <p>No movies found</p>;

  return (
    <ul className={s.movieList}>
      {filteredMovies.map(({ id, title, poster_path }) => (
        <li key={id} className={s.movieItem}>
          <Link
            to={`/movies/${id}`}
            className={s.movieLink}
            onClick={() => onMovieClick(id)}
            state={{ from: location }} 
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${poster_path}`}
              alt={title}
              className={s.moviePoster}
            />
            <p className={s.movieTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;