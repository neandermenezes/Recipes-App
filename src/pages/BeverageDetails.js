import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import {
  requestFoodsOrDrinks,
  requestRecipesById,
} from '../services/fetchAPIs';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Card from '../components/Card';
import {
  getFavoriteRecipes,
  setFavoriteRecipes,
} from '../services/localStorage';
import '../css/RecipeDetails.css';

const copy = require('clipboard-copy');

const currentURL = window.location.href;

const MAX_RECOMENDATION_CARDS = 6;

function BeverageDetails(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const history = useHistory();
  const [recipeInfo, setRecipeInfo] = useState({});
  const {
    strDrinkThumb,
    strDrink,
    strCategory,
    strAlcoholic,
    strInstructions,
  } = recipeInfo;
  const [renderRecomendations, setRecomendations] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    requestRecipesById(id, 'thecocktaildb')
      .then(({ drinks }) => setRecipeInfo(drinks[0]));
  }, []);

  useEffect(() => {
    requestFoodsOrDrinks('themealdb')
      .then(({ meals }) => setRecomendations(meals.slice(0, MAX_RECOMENDATION_CARDS)));
  }, []);

  useEffect(() => {
    if (getFavoriteRecipes()) {
      return setIsFavorite(
        getFavoriteRecipes().find((recipe) => recipe.id === id),
      );
    }
    setFavoriteRecipes([]);
  }, []);

  const ingredientsList = Object.entries(recipeInfo)
    .filter(
      (ingredients) => ingredients[0].includes('strIngredient')
        && ingredients[1] !== null
        && ingredients[1] !== '',
    )
    .map((item) => item[1]);

  const measuresList = Object.entries(recipeInfo)
    .filter(
      (measure) => measure[0].includes('strMeasure')
        && measure[1] !== null
        && measure[1] !== '',
    )
    .map((item) => item[1]);

  const handleShare = async () => {
    await copy(currentURL);
    setIsCopied(true);
  };

  const handleFavorite = () => {
    if (!isFavorite) {
      const newFavorite = {
        id,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
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
    <div className="page-container">
      <img
        className="details__image"
        src={ strDrinkThumb }
        alt="food"
        data-testid="recipe-photo"
      />
      <div className="title-container">
        <div className="titles">
          <h2 className="details__category" data-testid="recipe-category">
            {strAlcoholic}
          </h2>
          <h1 className="details__title" data-testid="recipe-title">
            {strDrink}
          </h1>
        </div>
        <div className="details">
          <button
            className="details__share"
            type="button"
            data-testid="share-btn"
            onClick={ handleShare }
          >
            <img className="details__icon" src={ shareIcon } alt="share" />
          </button>
          <button
            className="details__favorite"
            type="button"
            onClick={ handleFavorite }
          >
            <img
              className="details__icon"
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="heart"
              data-testid="favorite-btn"
            />
          </button>
        </div>
      </div>
      {isCopied && <p className="link margin-left">Link copiado!</p>}
      <p className="details__description margin-left">Ingredientes:</p>
      <ul className="ingredient-list">
        {ingredientsList.map((ingredient, index) => (
          <li
            className="details__ingredient"
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            <span className="details__ingredient-name">{`${ingredient}: `}</span>
            {measuresList[index] ? (
              <span className="details__measure">{measuresList[index]}</span>
            ) : (
              ''
            )}
          </li>
        ))}
      </ul>
      <p className="details__description--instructions">Instruções:</p>
      <p className="details__instructions" data-testid="instructions">
        {strInstructions}
      </p>
      <div className="recomended">
        <p className="details__description center-this">Ótimos acompanhamentos:</p>
        <div className="carousel">
          {renderRecomendations
            && renderRecomendations.map((food, index) => (
              <Card
                id="idMeal"
                itemId={ food.idMeal }
                header={ food.strMeal }
                img={ food.strMealThumb }
                index={ index }
                key={ food.idMeal }
                testId={ `${index}-recomendation-card` }
              />
            ))}
        </div>
      </div>
      <button
        className="login__btn start-recipe"
        type="button"
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
        // disabled (se a receita já foi feita)
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
        {/* ou texto continuar receita caso ela esteja em progresso */}
      </button>
    </div>
  );
}

BeverageDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BeverageDetails;
