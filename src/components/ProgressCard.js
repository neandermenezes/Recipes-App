import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setRecipeProgress,
  getRecipeProgress,
  setFavoriteRecipes,
  getFavoriteRecipes } from '../services/localStorage';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

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
}) {
  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const checkIngredients = () => {
    const liSearch = document.querySelectorAll('li');
    const inputSearch = document.querySelectorAll('input');
    getRecipeProgress()[type][id].map((index) => {
      liSearch[index].classList.toggle('selected_step', true);
      return inputSearch[index].checked;
    });
  };

  useEffect(() => {
    if (!getRecipeProgress()) {
      return setRecipeProgress({
        cocktails: {},
        meals: {},
      });
    }
    return checkIngredients();
  }, []);

  const handleFinishButton = () => {
    if (ingredients.length === getRecipeProgress()[type][id].length) {
      return setIsDisabled(false);
    }
    return setIsDisabled(true);
  };

  function checkIngredientChange({ target: { checked } }, index) {
    const recipesInProgressStorage = getRecipeProgress();

    const liSearch = document.querySelectorAll('li')[index];
    liSearch.classList.toggle('selected_step', checked);

    if (checked) {
      const newArrayOfIngredients = recipesInProgressStorage[type][id]
        ? [...recipesInProgressStorage[type][id], index] : [index];

      const result = recipesInProgressStorage[type].length
        ? { ...recipesInProgressStorage, [type]: { [id]: newArrayOfIngredients } }
        : { ...recipesInProgressStorage,
          [type]: { ...recipesInProgressStorage[type], [id]: newArrayOfIngredients } };

      setRecipeProgress(result);
      return handleFinishButton();
    }
    const newArrayOfIngredients = recipesInProgressStorage[type][id]
      .filter((item) => item !== index);

    const result = recipesInProgressStorage[type].length
      ? { ...recipesInProgressStorage, [type]: { [id]: newArrayOfIngredients } }
      : { ...recipesInProgressStorage,
        [type]: { ...recipesInProgressStorage[type], [id]: newArrayOfIngredients } };

    setRecipeProgress(result);
    return handleFinishButton();
  }

  const handleShare = async () => {
    await copy(`http://localhost:3000/${id}`);
    setIsCopied(true);
  };

  const handleFavorite = () => {
    if (!isFavorite) {
      const newFavorite = {
        id,
        type: type === 'meals' ? 'comida' : 'bebida',
        area,
        category: type === 'meals' ? category : '',
        alcoholicOrNot: type === 'meals' ? '' : category,
        name: title,
        image: photo,
      };
      setFavoriteRecipes([...getFavoriteRecipes(), newFavorite]);
      return setIsFavorite(!isFavorite);
    }

    const deleteFavorite = getFavoriteRecipes().filter(
      (recipe) => recipe.id !== id,
    );
    setFavoriteRecipes(deleteFavorite);
    return setIsFavorite(!isFavorite);
  };

  return (
    <div>
      <img data-testid="recipe-photo" src={ photo } alt="meal info" />
      <div>
        <button type="button" data-testid="share-btn" onClick={ handleShare }>
          <img src={ shareIcon } alt="share" />
        </button>
        {isCopied && <p>Link copiado!</p>}
      </div>
      <button type="button" onClick={ handleFavorite }>
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="heart"
          data-testid="favorite-btn"
        />
      </button>
      <h1 data-testid="recipe-title">{title}</h1>
      <p data-testid="recipe-category">{category}</p>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={ item } data-testid={ `${index}-ingredient-step` }>
            {`${item} - ${measures[index]}`}
            <input
              onChange={ (e) => checkIngredientChange(e, index) }
              onClick={ ({ target }) => console.log(index, target.checked) }
              type="checkbox"
            />
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">{instructions}</p>
      <button
        onClick={ () => history.push('/receitas-feitas') }
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
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
  instructions: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  area: PropTypes.string.isRequired,
};

export default ProgressCard;
