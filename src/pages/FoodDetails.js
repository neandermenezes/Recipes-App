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

const copy = require('clipboard-copy');

const currentURL = window.location.href;

// const FIRST_INGREDIENT = 9;
// const LAST_INGREDIENT = 29;
// const FIRST_MEASURE = 29;
// const LAST_MEASURE = 49;
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
      return setIsFavorite(getFavoriteRecipes().find((recipe) => recipe.id === id));
    }
    setFavoriteRecipes([]);
  }, []);

  // const filteredIngredients = Object.entries(recipeInfo).slice(
  //   FIRST_INGREDIENT,
  //   LAST_INGREDIENT,
  // );

  // const filteredMeasures = Object.entries(recipeInfo).slice(
  //   FIRST_MEASURE,
  //   LAST_MEASURE,
  // );

  // const ingredientsList = filteredIngredients
  //   .filter((ingredient) => ingredient[1] !== '')
  //   .map((item) => item[1]);

  // const measuresList = filteredMeasures
  //   .filter((measure) => measure[1] !== null)
  //   .map((item) => item[1]);

  const ingredientsList = Object.entries(recipeInfo).filter((ingredients) => (
    ingredients[0].includes('strIngredient')
      && ingredients[1] !== null
      && ingredients[1] !== ''
  )).map((item) => item[1]);

  const measuresList = Object.entries(recipeInfo).filter((measure) => (
    measure[0].includes('strMeasure')
      && measure[1] !== null
      && measure[1] !== ''
  )).map((item) => item[1]);

  const url = strYoutube ? strYoutube.split('=')[1] : strYoutube;

  const handleShare = async () => {
    await copy(currentURL);
    setIsCopied(true);
  };

  const handleFavorite = () => {
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
    <div>
      <div>
        <img src={ strMealThumb } alt="food" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h2 data-testid="recipe-category">{strCategory}</h2>
        <div>
          <button type="button" data-testid="share-btn" onClick={ handleShare }>
            <img src={ shareIcon } alt="share" />
          </button>
          {isCopied && <p>Link copiado!</p>}
        </div>
        <button
          type="button"
          onClick={ handleFavorite }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="heart"
            data-testid="favorite-btn"
          />
        </button>
      </div>
      <ul>
        {ingredientsList.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${ingredient} ${measuresList[index] ? measuresList[index] : ''}`}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        width="420"
        height="315"
        src={ `https://youtube.com/embed/${url}` }
        title={ strMeal }
        data-testid="video"
      />
      <div>
        <h2>Recomendadas</h2>
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
      <button
        className="start-recipe-btn"
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
