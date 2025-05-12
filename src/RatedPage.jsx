import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';

export default function RatedPage({
    RatedMovies,
    likedMovies,
    toggleLike,
    openDetail,
    loggedIn,
    ratedPage,
    ratedTotalPages,
    setRatedPage,
}) {
    //show nothing if not logged in
    if (!loggedIn) {
        return null;
    }

    return (
        <>
            <h1 style={{ textAlign: 'center', margin: '1rem 0' }}>
                Rated Movies
            </h1>
            
            <Pagination
                page={ratedPage}
                totalPages={ratedTotalPages}
                next={() => setRatedPage(p => Math.min(p + 1, ratedTotalPages))}
                prev={() => setRatedPage(p => Math.max(p - 1, 1))}
            />

            <MovieGrid
                movies={RatedMovies}
                likedMovies={likedMovies}
                toggleLike={toggleLike}
                openDetail={openDetail}
            />
        </>
    );
}
