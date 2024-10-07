import axios from "axios";
import s from "./HomePage.module.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import MovieList from "../../components/MovieList/MovieList";

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ3OGYwNzg3M2U3OWFmNjRlYjU1MGI5MTY4N2JiZCIsIm5iZiI6MTcyNzg3OTAwMy4yODU4MTcsInN1YiI6IjY2ZmQ1NTcyYjNmMTI4MWQ3YzU5NjM0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bZNqVT-n5xspOkFkOzWliBSfKvT-MRoIRumgJVGO4Xs",
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`, { state: { from: "/" } });
  };

  return (
    <div className={s.container}>
      <h1 className={s.title}>Trending Movies Today</h1>
      <MovieList movies={movies} onMovieClick={handleMovieClick} />
    </div>
  );
};

export default HomePage;
