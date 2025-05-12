// src/components/Header.jsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/project-logo.png';


export default function Header({ loggedIn, setLoggedIn }) {

  const [displayLogout, setDisplayLogout] = useState(false);

  const handleClickUsername = () => {
    setDisplayLogout(!displayLogout);
  }

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setDisplayLogout(false);
    setLoggedIn(false);
  }

  return (
    <header>
      <div className='header-switch-pages-container'>
        <ul className="header-tab">
          <li id="header-logo">
            <img src={logo} alt="Logo" />
          </li>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => isActive ? 'selected-tab' : ''}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorites"
              className={({ isActive }) => isActive ? 'selected-tab' : ''}
            >
              FAVORITE
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rated"
              className={({ isActive }) => isActive ? 'selected-tab' : ''}
            >
              RATED
            </NavLink>
          </li>
        </ul>
      </div>
      
      <div className='header-login-container'>
        {displayLogout && (
          <button className='header-logout-button' onClick={handleLogout}>
            Log Out
          </button>
        )}

        {loggedIn ? (
          <span onClick={handleClickUsername}> {JSON.parse(localStorage.getItem("userData") || "{}").username} </span>
        ) : (
          <NavLink to="/login">
            Log In
          </NavLink>
        )}
      </div>
    </header>
  );
}

