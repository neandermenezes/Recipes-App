import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import {
  requestFoodsOrDrinks,
  requestRecipesById,
} from '../services/fetchAPIs';
import Card from '../components/Card';
import {
  getFavoriteRecipes,
  setFavoriteRecipes,
  getDoneRecipes,
  getRecipeProgress,
} from '../services/localStorage';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

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
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgressDone] = useState(false);
  const [renderRecomendations, setRecomendations] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { sliceIngredients, sliceMeasures } = useContext(RecipesContext);

  useEffect(() => {
    if (getDoneRecipes()) {
      const currentRecipeIsDone = getDoneRecipes().find((recipe) => recipe.id === id);
      return setIsDone(currentRecipeIsDone);
    }
    return setIsDone(false);
  }, [id]);

  useEffect(() => {
    if (getRecipeProgress()) {
      const currentRecipeIsInProgress = !!getRecipeProgress().meals[id];
      return setIsInProgressDone(currentRecipeIsInProgress);
    }
    return setIsInProgressDone(false);
  }, [id]);

  useEffect(() => {
    requestRecipesById(id, 'themealdb').then(({ meals }) => setRecipeInfo(meals[0]));
  }, [id]);

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
  }, [id]);

  const ingredientsList = sliceIngredients(recipeInfo);
  const measuresList = sliceMeasures(recipeInfo);

  const url = strYoutube ? strYoutube.split('=')[1] : strYoutube;

  const handleFavoriteDependencies = {
    id,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  return (
    <div>
      <div>
        <img src={ strMealThumb } alt="food" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{strMeal}</h1>
        <h2 data-testid="recipe-category">{strCategory}</h2>
        <ShareButton
          textToCopy={ currentURL }
          setIsCopied={ setIsCopied }
          isCopied={ isCopied }
        />
        <FavoriteButton
          isFavorite={ isFavorite }
          setIsFavorite={ setIsFavorite }
          id={ id }
          favoriteDependencies={ handleFavoriteDependencies }
        />
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
      <div className="recomended">
        <h2>Recomendadas</h2>
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
        className={ isDone ? 'hidden-start-recipe-btn' : 'start-recipe-btn' }
        type="button"
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
        data-testid="start-recipe-btn"
      >
        {isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
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
