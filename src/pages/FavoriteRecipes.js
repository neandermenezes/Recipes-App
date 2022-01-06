import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getFavoriteRecipes, setFavoriteRecipes } from '../services/localStorage';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const currentURL = window.location.href;

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [renderFavorites, setRenderFavorites] = useState([]);
  useEffect(() => {
    setFavorites(getFavoriteRecipes());
  }, []);

  useEffect(() => {
    if (filteredRecipes.length) return setRenderFavorites(filteredRecipes);
    return setRenderFavorites(favorites);
  }, [favorites, filteredRecipes]);
  const handleShare = async () => {
    await copy(currentURL);
    setIsCopied(true);
  };
  const handleFavorite = ({ target: { id } }) => {
    const deleteFavorite = getFavoriteRecipes().filter(
      (recipe) => recipe.name !== id,
    );
    setFavoriteRecipes(deleteFavorite);
    setFavorites(deleteFavorite);
  };
  const handleFilter = ({ target: { id } }) => {
    const type = id === 'Food' ? 'comida' : 'bebida';
    const filterFavorites = favorites.filter((recipe) => recipe.type === type);
    setFilteredRecipes(filterFavorites);
  };
  const handleAll = () => {
    setFilteredRecipes([]);
  };
  return (
    <div>
      <Header name="Receitas Favoritas" />
      <div>
        <button
          id="All"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleAll }
        >
          All
        </button>
        <button
          id="Food"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFilter }
        >
          Food
        </button>
        <button
          id="Drink"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
        >
          Drink
        </button>
      </div>
      { renderFavorites && renderFavorites.map((recipe, index) => {
        if (recipe.type === 'comida') {
          return (
            <div key={ recipe.name }>
              <Link to={ `/comidas/${recipe.id}` }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  src={ recipe.image }
                  alt={ recipe.name }
                />
                <h3 data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </h3>
              </Link>
              <h4 data-testid={ `${index}-horizontal-top-text` }>
                { recipe.category }
              </h4>
              <h5>{ recipe.area }</h5>
              <div>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ handleShare }
                >
                  <img src={ shareIcon } alt="share" />
                </button>
                {isCopied && <p>Link copiado!</p>}
                <button type="button" onClick={ handleFavorite }>
                  <img
                    src={ blackHeartIcon }
                    alt="heart"
                    data-testid="favorite-btn"
                    id={ recipe.name }
                  />
                </button>
              </div>
            </div>
          );
        }
        return (
          <div key={ recipe.name }>
            <Link to={ `/bebidas/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
              <h3 data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </h3>
            </Link>
            <h4 data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot }
            </h4>
            <div>
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ handleShare }
              >
                <img src={ shareIcon } alt="share" />
              </button>
              {isCopied && <p>Link copiado!</p>}
              <button type="button" onClick={ handleFavorite }>
                <img
                  src={ blackHeartIcon }
                  alt="heart"
                  data-testid="favorite-btn"
                  id={ recipe.name }
                />
              </button>
            </div>
          </div>
        );
      }) }
    </div>
  );
}

export default FavoriteRecipes;
