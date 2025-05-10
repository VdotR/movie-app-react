// src/components/Header.jsx
import { NavLink } from 'react-router-dom';
import logo from '../assets/project-logo.png';


export default function Header() {
  return (
    <header>
      <ul className="header-tab">
        <li id="header-logo">
          <NavLink to="/"><img src={logo} alt="Logo" /></NavLink>
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
            LIKED
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

