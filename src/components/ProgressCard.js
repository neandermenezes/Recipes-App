import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { setRecipeProgress,
  getRecipeProgress,
  setFavoriteRecipes,
  getFavoriteRecipes,
  getDoneRecipes,
  setDoneRecipes } from '../services/localStorage';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import { checkIngredientChange, loadProgressPage } from '../helpers';

function ProgressCard({
  photo,
  title,
  category,
  ingredients,
  measures,
  instructions,
  type,
  id,
  area,
  alcoholic,
  tags,
}) {
  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (!getRecipeProgress()) {
      return setRecipeProgress({
        cocktails: {},
        meals: {},
      });
    }
  }, []);

  useEffect(() => {
    const liSearch = document.querySelectorAll('li');
    const inputSearch = document.querySelectorAll('input');
    const parameters = [id, type, photo, liSearch, inputSearch];
    loadProgressPage(parameters);
  }, [photo, id, type]);

  useEffect(() => {
    if (getFavoriteRecipes()) {
      return setIsFavorite(
        getFavoriteRecipes().find((recipe) => recipe.id === id),
      );
    }
    setFavoriteRecipes([]);
  }, []);

  const handleFinishButton = () => {
    if (ingredients.length === getRecipeProgress()[type][id].length) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  };

  const handleCheck = ({ target: { checked } }, index) => {
    const liSearch = document.querySelectorAll('li')[index];
    const parameters = [checked, index, type, id, liSearch];
    checkIngredientChange(parameters);
    return handleFinishButton();
  };

  const handleFavoriteDependencies = { id,
    type: type === 'meals' ? 'comida' : 'bebida',
    area,
    category,
    alcoholicOrNot: type === 'meals' ? '' : alcoholic,
    name: title,
    image: photo };

  const handleFinish = () => {
    if (!getDoneRecipes()) {
      setDoneRecipes([{ ...handleFavoriteDependencies, doneDate: new Date(), tags }]);
    } else {
      setDoneRecipes([...getDoneRecipes(),
        { ...handleFavoriteDependencies, doneDate: new Date(), tags }]);
    }
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <img data-testid="recipe-photo" src={ photo } alt="meal info" />
      <ShareButton
        textToCopy={ `http://localhost:3000/${type === 'meals' ? 'comidas' : 'bebidas'}/${id}` }
        setIsCopied={ setIsCopied }
        isCopied={ isCopied }
      />
      <FavoriteButton
        isFavorite={ isFavorite }
        setIsFavorite={ setIsFavorite }
        id={ id }
        favoriteDependencies={ handleFavoriteDependencies }
      />
      <h1 data-testid="recipe-title">{title}</h1>
      <p data-testid="recipe-category">{type === 'meals' ? category : alcoholic}</p>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={ item } data-testid={ `${index}-ingredient-step` }>
            {`${item} - ${measures[index]}`}
            <input
              onChange={ (e) => handleCheck(e, index) }
              type="checkbox"
            />
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">{instructions}</p>
      <button
        onClick={ handleFinish }
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ isDisabled }
      >
        Finalizar receita
      </button>
    </div>
  );
}

ProgressCard.propTypes = {
  photo: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
  instructions: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  area: PropTypes.string,
  alcoholic: PropTypes.string,
  tags: PropTypes.string,
};

ProgressCard.defaultProps = {
  photo: '',
  title: '',
  category: '',
  ingredients: [],
  measures: [],
  instructions: '',
  type: '',
  id: '',
  area: '',
  alcoholic: '',
  tags: '',
};

export default ProgressCard;
