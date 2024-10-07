import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import s from './MovieReviews.module.css'

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization:
               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQ3OGYwNzg3M2U3OWFmNjRlYjU1MGI5MTY4N2JiZCIsIm5iZiI6MTcyNzg3OTAwMy4yODU4MTcsInN1YiI6IjY2ZmQ1NTcyYjNmMTI4MWQ3YzU5NjM0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bZNqVT-n5xspOkFkOzWliBSfKvT-MRoIRumgJVGO4Xs",
            },
          }
        );
        
        const limitedReviews = response.data.results.slice(0, 2);
        setReviews(limitedReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!reviews.length) {
    return <p>No reviews available</p>;
  }

  return (
    <div className={s.container}>
      <h2>Reviews</h2>
      <ul className={s.reviewList}>
        {reviews.map(({ id, author, content }) => (
          <li key={id} className={s.reviewItem}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;