import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import s from './MoviesPage.module.css'

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams(); // Додано useSearchParams для управління параметрами URL
  const query = searchParams.get("query") || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (query === "") return;

    const fetchMovies = async () => {
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ3OGYwNzg3M2U3OWFmNjRlYjU1MGI5MTY4N2JiZCIsIm5iZiI6MTcyNzg3OTAwMy4yODU4MTcsInN1YiI6IjY2ZmQ1NTcyYjNmMTI4MWQ3YzU5NjM0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bZNqVT-n5xspOkFkOzWliBSfKvT-MRoIRumgJVGO4Xs",
            },
          }
        );

        if (response.data.results.length === 0) {
          navigate("/404");
        } else {
          setMovies(response.data.results);
        }
      } catch (error) {
        setError("Something went wrong. Please try again later.");
      }
    };

    fetchMovies();
  }, [query, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (query.trim() === "") {
      navigate("/404");
      return;
    }

    setSearchParams({ query });
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, { state: { from: "/movies" } });
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSearch} className={s.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value })}
          className={s.input}
          placeholder="Search movies..."
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
      {error && <p className={s.error}>{error}</p>}
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default MoviesPage;