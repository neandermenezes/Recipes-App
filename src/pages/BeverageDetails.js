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
} from '../services/localStorage';
import RecipesContext from '../context/RecipesContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

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
  const { sliceIngredients, sliceMeasures } = useContext(RecipesContext);

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

  const ingredientsList = sliceIngredients(recipeInfo);
  const measuresList = sliceMeasures(recipeInfo);

  const handleFavoriteDependencies = {
    id,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  return (
    <div>
      <div>
        <img src={ strDrinkThumb } alt="food" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{strDrink}</h1>
        <h2 data-testid="recipe-category">{strAlcoholic}</h2>
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
      <div className="recomended">
        <h2>Recomendadas</h2>
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
