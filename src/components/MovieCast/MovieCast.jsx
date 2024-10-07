import { useParams } from 'react-router';
import s from './MovieCast.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react';


const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ3OGYwNzg3M2U3OWFmNjRlYjU1MGI5MTY4N2JiZCIsIm5iZiI6MTcyNzg3OTAwMy4yODU4MTcsInN1YiI6IjY2ZmQ1NTcyYjNmMTI4MWQ3YzU5NjM0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bZNqVT-n5xspOkFkOzWliBSfKvT-MRoIRumgJVGO4Xs",
            },
          }
        );
        const filteredCast = response.data.cast
          .filter((actor) => actor.profile_path)
          .slice(0, 20); 
        setCast(filteredCast);
      } catch (error) {
        console.error(
          "Failed to fetch cast:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false); 
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>; 
  if (!cast.length) return <p>No cast information available</p>;

  return (
    <div className={s.container}>
      <h2>Cast</h2>
      <ul className={s.castList}>
        {cast.map(({ id, name, character, profile_path }) => (
          <li key={id} className={s.castItem}>
            <img
              src={`https://image.tmdb.org/t/p/w200${profile_path}`}
              alt={name}
              className={s.castImage}
            />
            <div className={s.castInfo}>
              <p className={s.castName}>
                &#8226; <b>Name:</b> {name}
              </p>
              <p className={s.castCharacter}>
                &#8226; <b>Character:</b> {character}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;