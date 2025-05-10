import MovieCard from './MovieCard';

export default function MovieGrid({ movies, likedMovies, toggleLike, openDetail }) {
  const likedIds = new Set(likedMovies.map(m => m.id));
  return (
    <div id="movies-container">
      {movies.map(m => (
        <MovieCard
          key={m.id}
          movie={m}
          liked={likedIds.has(m.id)}
          toggleLike={toggleLike}
          openDetail={openDetail}
        />
      ))}
    </div>
  );
}
