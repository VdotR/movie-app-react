 // src/App.jsx
 import { useEffect, useState, useCallback } from 'react';
 import { Routes, Route } from 'react-router-dom';

 import Header from './components/Header';
 import MovieDetailModal from './components/MovieDetailModal';
 import { fetchMovies, fetchMovieDetails } from './api';

import HomePage           from './HomePage';
import FavoritesPage      from './FavoritesPage';

 import './App.css';

 export default function App() {
   const [movies, setMovies]           = useState([]);
   const [likedMovies, setLikedMovies] = useState([]);
   const [category, setCategory]       = useState('popular');
   const [page, setPage]               = useState(1);
   const [totalPages, setTotalPages]   = useState(0);
   const [detail, setDetail]           = useState(null);

   useEffect(() => {
     fetchMovies({ category, page }).then(r => {
       setMovies(r.results);
       setTotalPages(r.total_pages);
     });
   }, [category, page]);

   const openDetail = useCallback(async (id) => {
     const raw = await fetchMovieDetails(id);
     setDetail(raw);
   }, []);

   const toggleLike = movie => {
     setLikedMovies(prev => {
       const exists = prev.some(m => m.id === movie.id);
       return exists
         ? prev.filter(m => m.id !== movie.id)
         : [...prev, movie];
     });
   };

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
       </Routes>

       <footer>
         <p>Created by Victor Ren – React port {new Date().getFullYear()}</p>
       </footer>

       <MovieDetailModal movie={detail} close={() => setDetail(null)} />
     </>
   );
 }
