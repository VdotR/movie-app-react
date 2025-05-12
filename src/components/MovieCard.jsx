import { IoIosHeart, IoIosHeartEmpty, IoIosStar } from 'react-icons/io';

export default function MovieCard({ movie, liked, toggleLike, openDetail }) {
  const { id, poster_path, title, vote_average } = movie;
  return (
    <div className="movie-card" id={id}>
      <div className="movie-card-image">
        <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
      </div>
      <h4 className="movie-card-title" onClick={() => openDetail(id)}> {title}</h4>
      <div className="movie-card-rating">
        <div className="rating"><IoIosStar/><span>{vote_average}</span></div>
        <div className="like-section" onClick={() => toggleLike(movie)}>
          {liked ? <IoIosHeart className="ion-ios-heart"/> : <IoIosHeartEmpty className="ion-ios-heart-outline"/>}
        </div>
      </div>
    </div>
  );
}
