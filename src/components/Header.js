import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { HeaderContext } from '../context/RecipesContext';
import profileIcon from '../images/profileIconYellow.svg';
import searchIcon from '../images/searchIconYellow.svg';
import '../styles/header.css';
import SearchInput from './SearchInput';

function Header({ title, isEnableSearchIcon }) {
  const {
    showDisplay,
    handleClick,
  } = useContext(HeaderContext);
  const history = useHistory();

  return (
    <>
      <header>
        <input
          type="image"
          className="profile-top-btn"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/perfil') }
          src={ profileIcon }
          alt="Ícone do perfil"
        />
        <h1
          type="text"
          data-testid="page-title"
        >
          {title}
        </h1>
        { isEnableSearchIcon && (
          <input
            type="image"
            className="search-top-btn"
            data-testid="search-top-btn"
            onClick={ handleClick }
            src={ searchIcon }
            alt="Ícone de procurar"
          />
        )}
      </header>
      {showDisplay && (
        <SearchInput title={ title } />
      )}
    </>
  );
}

Header.propTypes = {
  isEnableSearchIcon: PropTypes.bool,
  title: PropTypes.string,
};

Header.defaultProps = {
  isEnableSearchIcon: false,
  title: '',
};

export default Header;
