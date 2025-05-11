// src/App.jsx
import { useEffect, useState, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import MovieDetailPage from './MovieDetailPage';
import { fetchMovies } from './api';

import HomePage from './HomePage';
import FavoritesPage from './FavoritesPage';

import './App.css';

export default function App() {
  /* --------------- state --------------- */
  const [movies, setMovies]           = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);
  const [category, setCategory]       = useState('popular');
  const [page, setPage]               = useState(1);
  const [totalPages, setTotalPages]   = useState(0);
  const [userRatedMovies, setUserRatedMovies] = useState([]);
  const [userLikedMovies, setUserLikedMovies] = useState([]);

  /* -------- router helpers & cache -------- */
  const navigate   = useNavigate();
  // a function to jump to any movie detail page by id
  const openDetail = (id) => navigate(`/movies/${id}`); 

  // cache for already-fetched category+page results
  const cache = useRef({});

  /* --------------- fetch w/ cache --------------- */
  useEffect(() => {
    const key = `${category}-${page}`; //unique key for each category+page

    // serve from cache if available
    if (cache.current[key]) {
      const { results, total_pages } = cache.current[key];
      setMovies(results);
      setTotalPages(total_pages);
      return;
    }

    // otherwise fetch and cache
    fetchMovies({ category, page }).then((r) => {
      cache.current[key] = r;
      setMovies(r.results);
      setTotalPages(r.total_pages);
    });
  }, [category, page]);

  /* --------------- like / unlike --------------- */
  const toggleLike = (movie) => {
    setLikedMovies(prev => {
      const exists = prev.some(m => m.id === movie.id);
      return exists ? prev.filter(m => m.id !== movie.id)
                    : [...prev, movie];
    });
  };

  /* --------------- render --------------- */
  return (
    <>
      <div className="title-container"><h1>Movie DB</h1></div>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              movies={movies}
              likedMovies={likedMovies}
              category={category}
              setCategory={setCategory}
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              toggleLike={toggleLike}
              openDetail={openDetail}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritesPage
              likedMovies={likedMovies}
              toggleLike={toggleLike}
              openDetail={openDetail}
            />
          }
        />
        <Route path="/movies/:id" element={<MovieDetailPage />} />
      </Routes>

      <footer>
        <p>Created by Victor Ren – 2025</p>
      </footer>
    </>
  );
}
