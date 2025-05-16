// src/MovieDetailPage.jsx
import { use, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosStar } from 'react-icons/io';
import { fetchMovieDetails } from './api';

export default function MovieDetailPage( 
    { userRatedMovies, 
      loggedIn,
      rateMovieHandler} ) {
    const { id } = useParams();               // → “…/movies/123” → id === "123"
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [currentRating, setCurrentRating] = useState(1);
    const [userRating, setUserRating] = useState(null);

    const [isRated, setIsRated] = useState(false);

    const RATINGS = [1,2,3,4,5,6,7,8,9,10];

    const handleRatingChange = (newRating) => {
      setCurrentRating(newRating);
      //alert(`You rated this movie ${newRating} out of 10`);
    };

    const handleSubmitRating = () => {
      if (loggedIn){
        rateMovieHandler(movie, currentRating);
        setUserRating(currentRating);
        setIsRated(true);
        //alert(`You rated this movie ${currentRating} out of 10`);
      }
    }

    useEffect(() => {
      fetchMovieDetails(id).then(setMovie);
      if (!loggedIn) return;                    

      const match = userRatedMovies.find(
        m => Number(m.id) === Number(id)               
      );

      if (match) {                              
        setIsRated(true);
        setUserRating(match.rating);            
      } else {                                  
        setIsRated(false);
        setUserRating(null);                    
      }
    }, [userRatedMovies, loggedIn, id]);

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
            <h3>Average Rating</h3>
            <IoIosStar className="IoIosStar"/><span>{movie.vote_average}</span>
          </div>
          
          {loggedIn ? (
            <div className="user-rating">
            <h3>User Rating</h3>
            {isRated ? (
              <>
                <span> You rated this movie: </span>
                <IoIosStar className="IoIosStar"/> 
                <span> {userRating} </span>
              </>
              ) : (
                <span> You have not rated this movie yet </span>
              )
            }
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
                    Submit Rating
                </button>
            </div>
          </div>
          ) : (
            <span> Please Log In to Rate the Movie </span>
          )}
          

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

          <button className="go-home-btn" onClick={() => navigate('/') }>
            ⬅ Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
