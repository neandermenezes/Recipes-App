import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header className="header">
      <img src={ profileIcon } alt="" />
      <h2 data-testid="page-title">Comida</h2>
      <img src={ searchIcon } alt="" />
    </header>
  );
}

export default Header;
