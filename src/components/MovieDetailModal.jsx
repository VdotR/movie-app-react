import { IoIosStar } from 'react-icons/io';

export default function MovieDetailModal({ movie, close }) {
  if (!movie) return null;

  return (
    <div className="backdrop" onClick={close}>
      <div className="movie-detail" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={close}>x</button>
        <div className="movie-detail-info">
          <div className="movie-detail-poster">
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}/>
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
                {movie.genres.map(g => <li key={g.id} className="movie-detail-genre">{g.name}</li>)}
              </ul>
            </div>

            <div className="movie-detail-rating">
              <h3>Rating</h3>
              <IoIosStar/><span>{movie.vote_average}</span>
            </div>

            <div className="production-companies">
              <h3>Production Companies</h3>
              <ul className="production-companies-list">
                {movie.production_companies.map(c =>
                  c.logo_path && (
                    <li key={c.id} className="production-company">
                      <img src={`https://image.tmdb.org/t/p/original/${c.logo_path}`}/>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
