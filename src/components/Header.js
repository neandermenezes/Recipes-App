import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchForm from './SearchForm';

function Header({ name, search = false }) {
  const history = useHistory();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  return (
    <header className="header">
      <button type="button" onClick={ () => history.push('/perfil') }>
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt=""
        />
      </button>
      <h2 data-testid="page-title">{name}</h2>
      {search
      && (
        <button
          type="button"
          onClick={ () => setIsSearchVisible(!isSearchVisible) }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt=""
          />
        </button>
      )}
      {isSearchVisible && <SearchForm />}
    </header>
  );
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  search: PropTypes.bool,
};

Header.defaultProps = {
  search: false,
};

export default Header;
