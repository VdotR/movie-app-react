import MovieGrid from './components/MovieGrid';

export default function FavoritesPage({
  likedMovies,
  toggleLike,
  openDetail,
  loggedIn,
}) {
  //show nothing if not logged in
  if (!loggedIn) {
    return null;
  }

  return (
    <MovieGrid
      movies={likedMovies}
      likedMovies={likedMovies}
      toggleLike={toggleLike}
      openDetail={openDetail}
    />
  );
}
