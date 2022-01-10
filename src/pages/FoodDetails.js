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

function FoodDetails(props) {
  const {
    match: {
      params: { id },
    },
  } = props;
  const history = useHistory();

  const [recipeInfo, setRecipeInfo] = useState({});
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strArea,
  } = recipeInfo;
  const [renderRecomendations, setRecomendations] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    requestRecipesById(id, 'themealdb').then(({ meals }) => setRecipeInfo(meals[0]));
  }, []);

  useEffect(() => {
    requestFoodsOrDrinks('thecocktaildb')
      .then(({ drinks }) => setRecomendations(drinks.slice(0, MAX_RECOMENDATION_CARDS)));
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

  const url = strYoutube ? strYoutube.split('=')[1] : strYoutube;

  const handleShare = async () => {
    await copy(currentURL);
    setIsCopied(true);
  };

  const handleFavorite = () => {
    console.log('oi');
    if (!isFavorite) {
      const newFavorite = {
        id,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
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
        src={ strMealThumb }
        alt="food"
        data-testid="recipe-photo"
      />
      <div className="title-container">
        <div className="titles">
          <h2 className="details__category" data-testid="recipe-category">
            {strCategory}
          </h2>
          <h1 className="details__title" data-testid="recipe-title">
            {strMeal}
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
      <iframe
        className="details__video"
        width="360"
        height="315"
        src={ `https://youtube.com/embed/${url}` }
        title={ strMeal }
        data-testid="video"
      />
      <div className="recomended">
        <p className="details__description center-this">Ótimos acompanhamentos:</p>
        <div className="carousel">
          {renderRecomendations
            && renderRecomendations.map((beverage, index) => (
              <Card
                id="idDrink"
                itemId={ beverage.idDrink }
                header={ beverage.strDrink }
                img={ beverage.strDrinkThumb }
                index={ index }
                key={ beverage.idDrink }
                testId={ `${index}-recomendation-card` }
              />
            ))}
        </div>
      </div>
      <button
        className="login__btn start-recipe"
        type="button"
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        // disabled (se a receita já foi feita)
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
        {/* ou texto continuar receita caso ela esteja em progresso */}
      </button>
    </div>
  );
}

FoodDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodDetails;
