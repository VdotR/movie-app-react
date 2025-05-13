import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';
import { useEffect } from 'react';

export default function FavoritesPage({
  likedMovies,
  toggleLike,
  openDetail,
  loggedIn,
  likedPage,
  likedTotalPages,
  setLikedPage,
}) {
  //show nothing if not logged in
  if (!loggedIn) {
    return null;
  }

  useEffect(() => {
    setLikedPage(1);
  }, [loggedIn]);

  return (
    <>
        <h1 style={{ textAlign: 'center', margin: '1rem 0' }}>
          Favorite Movies
        </h1>
        
        <Pagination
          page={likedPage}
          totalPages={likedTotalPages}
          next={() => setLikedPage(p => Math.min(p + 1, likedTotalPages))}
          prev={() => setLikedPage(p => Math.max(p - 1, 1))}
        />
        
        <MovieGrid
          movies={likedMovies}
          likedMovies={likedMovies}
          toggleLike={toggleLike}
          openDetail={openDetail}
        />
    </>
  );
}
