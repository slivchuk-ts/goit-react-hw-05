import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate, useParams } from "react-router";
import s from './MovieDetailsPage.module.css'
import { Link } from "react-router-dom";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  
  const prevLocationRef = useRef(location.state?.from || "/movies"); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ3OGYwNzg3M2U3OWFmNjRlYjU1MGI5MTY4N2JiZCIsIm5iZiI6MTcyNzg3OTAwMy4yODU4MTcsInN1YiI6IjY2ZmQ1NTcyYjNmMTI4MWQ3YzU5NjM0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bZNqVT-n5xspOkFkOzWliBSfKvT-MRoIRumgJVGO4Xs",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        setError(true);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(prevLocationRef.current); 
  };

  if (error) {
    return <Navigate to="/404" />;
  }

  if (!movie) return null;

  return (
    <div className={s.container}>
      <button onClick={handleGoBack} className={s.backButton}>
        Go back
      </button>
      <h1 className={s.title}>
        {movie.title} ({movie.release_date.split("-")[0]})
      </h1>
      <div className={s.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={s.poster}
        />
        <div className={s.info}>
          <p>User score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <div className={s.additionalInfo}>
        <h2>Additional information</h2>
        <nav className={s.navLinks}>
          <Link to="cast" state={{ from: prevLocationRef.current }}>
            {" "}
            {/* Передаємо стан з useRef */}
            Cast
          </Link>
          <Link to="reviews" state={{ from: prevLocationRef.current }}>
            {" "}
            {/* Передаємо стан з useRef */}
            Reviews
          </Link>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;