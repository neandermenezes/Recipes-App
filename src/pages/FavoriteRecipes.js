import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getFavoriteRecipes, setFavoriteRecipes } from '../services/localStorage';
import FavoriteCard from '../components/FavoriteCard';

const copy = require('clipboard-copy');

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

  const handleShare = async ({ target: { id } }) => {
    await copy(`http://localhost:3000/${id}`);
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
              <FavoriteCard
                type="comidas"
                recipe={ recipe }
                index={ index }
                topText={ `${recipe.area} - ${recipe.category}` }
                handleFavorite={ handleFavorite }
                handleShare={ handleShare }
                isCopied={ isCopied }
              />
            </div>
          );
        }
        return (
          <div key={ recipe.name }>
            <FavoriteCard
              type="bebidas"
              recipe={ recipe }
              index={ index }
              topText={ recipe.alcoholicOrNot }
              handleFavorite={ handleFavorite }
              handleShare={ handleShare }
              isCopied={ isCopied }
            />
          </div>
        );
      }) }
    </div>
  );
}

export default FavoriteRecipes;
