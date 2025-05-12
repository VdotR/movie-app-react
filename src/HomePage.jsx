// src/HomePage.jsx
import FilterSelect from './components/FilterSelect';
import Pagination   from './components/Pagination';
import MovieGrid    from './components/MovieGrid';

export default function HomePage({
  movies,
  likedMovies,
  category,
  setCategory,
  page,
  totalPages,
  setPage,
  toggleLike,
  openDetail,
}) {
  return (
    <>
      <FilterSelect
        category={category}
        setCategory={setCategory}
        resetPage={() => setPage(1)}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        next={() => setPage(p => Math.min(p + 1, totalPages))}
        prev={() => setPage(p => Math.max(p - 1, 1))}
      />
      <MovieGrid
        movies={movies}
        likedMovies={likedMovies}
        toggleLike={toggleLike}
        openDetail={openDetail}
      />
    </>
  );
}
