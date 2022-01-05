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

const FIRST_INGREDIENT = 17;
const LAST_INGREDIENT = 32;
const FIRST_MEASURE = 32;
const LAST_MEASURE = 47;
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
      return setIsFavorite(getFavoriteRecipes().find((recipe) => recipe.id === id));
    }
    setFavoriteRecipes([]);
  }, []);

  const filteredIngredients = Object.entries(recipeInfo).slice(
    FIRST_INGREDIENT,
    LAST_INGREDIENT,
  );

  const filteredMeasures = Object.entries(recipeInfo).slice(
    FIRST_MEASURE,
    LAST_MEASURE,
  );

  console.log(filteredIngredients);
  const ingredientsList = filteredIngredients
    .filter((ingredient) => ingredient[1] !== null)
    .map((item) => item[1]);

  const measuresList = filteredMeasures
    .filter((measure) => measure[1] !== null)
    .map((item) => item[1]);

  const handleShare = async () => {
    await copy(currentURL);
    global.alert('Link copiado!');
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

  console.log(recipeInfo);

  return (
    <div>
      <div>
        <img src={ strDrinkThumb } alt="food" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <h2 data-testid="recipe-category">{strAlcoholic}</h2>
        <button type="button" data-testid="share-btn" onClick={ handleShare }>
          <img src={ shareIcon } alt="share" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ handleFavorite }
        >
          <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="heart" />
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
      <div>
        <h2>Recomendadas</h2>
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
      <button
        className="start-recipe-btn"
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
