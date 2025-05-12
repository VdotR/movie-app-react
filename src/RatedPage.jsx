import MovieGrid from './components/MovieGrid';

export default function RatedPage({
  RatedMovies,
  likedMovies,
  toggleLike,
  openDetail,
  loggedIn
}) {
    //show nothing if not logged in
    if (!loggedIn) {
        return null;
    }

    return (
        <MovieGrid
        movies={RatedMovies}
        likedMovies={likedMovies}
        toggleLike={toggleLike}
        openDetail={openDetail}
        />
    );
}
