import React, { useContext, useEffect, useState } from 'react';
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
import RecipesContext from '../context/RecipesContext';

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
  const { sliceIngredients, sliceMeasures } = useContext(RecipesContext);

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

  const ingredientsList = sliceIngredients(recipeInfo);
  const measuresList = sliceMeasures(recipeInfo);

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
        <button type="button" onClick={ handleFavorite }>
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
