import React, { useEffect, useState } from 'react';
import { requestRecipesById } from '../services/fetchAPIs';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const FIRST_INGREDIENT = 9;
const LAST_INGREDIENT = 29;

function FoodDetails(props) {
  const { match: { params: { id } } } = props;
  const [recipeInfo, setRecipeInfo] = useState({});
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = recipeInfo;
  useEffect(() => {
    requestRecipesById(id, 'themealdb')
      .then(({ meals }) => setRecipeInfo(meals[0]));
  }, [id]);

  console.log(recipeInfo);

  const filteredIngredients = Object.entries(recipeInfo)
    .slice(FIRST_INGREDIENT, LAST_INGREDIENT);
  const ingredientsList = filteredIngredients.filter((ingredient) => (
    ingredient[1].length > 0)).map((item) => item[1]);

  const url = strYoutube ? strYoutube.split('=')[1] : strYoutube;

  return (
    <div>
      <div>
        <img src={ strMealThumb } alt="food" data-testid="recipe-photo" />
        <h1 data-testid="recipe-title">{ strMeal }</h1>
        <h2 data-testid="recipe-category">{ strCategory }</h2>
        <button
          type="button"
          data-testid="share-btn"
        >
          <img src={ shareIcon } alt="share" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="heart" />
        </button>
      </div>
      <ul>
        {ingredientsList.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { ingredient }
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      <iframe
        width="420"
        height="315"
        src={ `https://youtube.com/embed/${url}` }
        title={ strMeal }
        data-testid="video"
      />
      <div>
        <h2>Recomendadas</h2>
        <p data-testid="index-recomendation-card"></p>
      </div>
      <button
        type="button"
        // onClick={ startRecipe }
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default FoodDetails;
