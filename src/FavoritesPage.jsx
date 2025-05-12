// src/FavoritesPage.jsx
import MovieGrid from './components/MovieGrid';

export default function FavoritesPage({
  likedMovies,
  toggleLike,
  openDetail,
}) {
  return (
    <MovieGrid
      movies={likedMovies}
      likedMovies={likedMovies}
      toggleLike={toggleLike}
      openDetail={openDetail}
    />
  );
}
