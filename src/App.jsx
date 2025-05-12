// src/App.jsx
import { useEffect, useState, useRef, use } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import MovieDetailPage from './MovieDetailPage';
import {  fetchMovies, 
          getLikedMovies, 
          getRatedMovies, 
          likeMovie, 
          unlikeMovie, 
          rateMovie 
        } from './api';

import HomePage from './HomePage';
import FavoritesPage from './FavoritesPage';
import LoginPage from './LoginPage';
import RatedPage from './RatedPage';

import './App.css';


export default function App() {
    /* --------------- states --------------- */
    const [movies, setMovies]           = useState([]);
    // const [likedMovies, setLikedMovies] = useState([]);
    const [category, setCategory]       = useState('popular');
    const [page, setPage]               = useState(1);
    const [totalPages, setTotalPages]   = useState(0);
    const [userRatedMovies, setUserRatedMovies] = useState([]);
    const [userLikedMovies, setUserLikedMovies] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [likedPage, setLikedPage] = useState(1);
    const [likedTotalPages, setLikedTotalPages] = useState(0);
    const [ratedPage, setRatedPage] = useState(1);
    const [ratedTotalPages, setRatedTotalPages] = useState(0);

    /* -------- router helpers & cache -------- */
    const navigate   = useNavigate();
    // a function to jump to any movie detail page by id
    const openDetail = (id) => navigate(`/movies/${id}`); 

    // cache for already-fetched category+page results
    const cache = useRef({});

    const loadUserData = () => {
      return JSON.parse(localStorage.getItem("userData") || "{}");
    }


    const loadLikedMovies = async() => {
      const { sessionId, accountId } = loadUserData();
      if (loggedIn) {
        getLikedMovies({ sessionId, accountId, likedPage })
          .then((r) => {
            setUserLikedMovies(r.results);
            setLikedTotalPages(r.total_pages);
          })
          .catch((e) => console.error(e));
      }
    }

    const loadRatedMovies = async() => {
      const { sessionId, accountId } = loadUserData();
      if (loggedIn) {
        getRatedMovies({ sessionId, accountId, ratedPage })
          .then((r) => {
            setUserRatedMovies(r.results);
            setRatedTotalPages(r.total_pages);
          })
          .catch((e) => console.error(e));
      }
    }


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
      if (loggedIn) {
        
      }
    };

    // Load liked and rated movies when the user logs in
    // need pagination for both as api now requires page number
    useEffect(() => {
      if (loggedIn) {
        loadRatedMovies();
      }
    }, [ratedPage, loggedIn]);

    useEffect(() => {
      if (loggedIn) {
        loadLikedMovies();
      }
    }, [likedPage, loggedIn]);

  /* --------------- render --------------- */
  return (
    <>
      <div className="title-container"><h1>Movie DB</h1></div>
      <Header 
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              movies={movies}
              likedMovies={userLikedMovies}
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
              likedMovies={userLikedMovies}
              toggleLike={toggleLike}
              openDetail={openDetail}
              loggedIn={loggedIn}
              likedPage={likedPage}
              likedTotalPages={likedTotalPages}
              setLikedPage={setLikedPage}
            />
          }
        />

        <Route
          path="/rated"
          element={
            <RatedPage
              RatedMovies={userRatedMovies}
              likedMovies={userLikedMovies}
              toggleLike={toggleLike}
              openDetail={openDetail}
              loggedIn={loggedIn}
              ratedPage={ratedPage}
              ratedTotalPages={ratedTotalPages}
              setRatedPage={setRatedPage}
            />
          }
        />
        <Route path="/movies/:id" element={<MovieDetailPage />} />

        <Route path="login" element={<LoginPage 
                                      setLoggedIn={setLoggedIn}
                                      />}
        />
      </Routes>

      <footer>
        <p>Created by Victor Ren – 2025</p>
      </footer>
    </>
  );
}
