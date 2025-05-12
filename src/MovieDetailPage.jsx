// src/MovieDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosStar } from 'react-icons/io';
import { fetchMovieDetails } from './api';

export default function MovieDetailPage( {userRatedMovies, loggedIn} ) {
  const { id } = useParams();               // → “…/movies/123” → id === "123"
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [currentRating, setCurrentRating] = useState(1);

  const RATINGS = [1,2,3,4,5,6,7,8,9,10];

  const handleRatingChange = (newRating) => {
    setCurrentRating(newRating);
    //alert(`You rated this movie ${newRating} out of 10`);
  };

  const handleSubmitRating = () => {
    alert(`You rated this movie ${currentRating} out of 10 \nCOME BACK LATER TO INCORPORATE API`);
  }

  useEffect(() => {
    fetchMovieDetails(id).then(setMovie);
  }, [id]);

  if (!movie) return <p className="loading">Loading…</p>;

  return (
    <div className="movie-detail-page">
      <div className="movie-detail-info">
        <div className="movie-detail-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className="movie-detail-nonposter">
          <h2>{movie.title}</h2>

          <div className="movie-detail-overview">
            <h3>Overview</h3>
            <p>{movie.overview}</p>
          </div>

          <div className="movie-detail-genre-container">
            <h3>Genres</h3>
            <ul className="movie-detail-genres-list">
              {movie.genres.map(g => (
                <li key={g.id} className="movie-detail-genre">{g.name}</li>
              ))}
            </ul>
          </div>

          <div className="movie-detail-rating">
            <h3>Rating</h3>
            <IoIosStar /><span>{movie.vote_average}</span>
          </div>

          <div className="user-rating">
            <h3>Your Rating</h3>
            <div>
                <select
                    className="user-rating-select"
                    onChange={e => handleRatingChange(e.target.value)}
                    value={currentRating}
                >
                    {RATINGS.map(r => (
                      <option key={`option${r}`} value={r}>
                        {r}
                      </option>
                    ))}
                </select>
                <button 
                    className="submit-rating-btn"
                    onClick={() => handleSubmitRating()}
                >
                    Submit
                </button>
            </div>
          </div>

          <div className="production-companies">
            <h3>Production Companies</h3>
            <ul className="production-companies-list">
              {movie.production_companies
                .filter(c => c.logo_path)
                .map(c => (
                  <li key={c.id} className="production-company">
                    <img src={`https://image.tmdb.org/t/p/w500/${c.logo_path}`} alt={c.name} />
                  </li>
                ))}
            </ul>
          </div>

          {/* ——— go‑home button ——— */}
          <button className="go-home-btn" onClick={() => navigate('/') }>
            ⬅ Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
