import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProgressCard from '../components/ProgressCard';
import RecipesContext from '../context/RecipesContext';
import { requestRecipesById } from '../services/fetchAPIs';

function FoodInProgress(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { sliceIngredients, sliceMeasures } = useContext(RecipesContext);
  const [recipeInfo, setRecipeInfo] = useState({});
  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
  } = recipeInfo;

  const ingredientsList = sliceIngredients(recipeInfo);
  const measuresList = sliceMeasures(recipeInfo);

  useEffect(() => {
    requestRecipesById(id, 'themealdb').then(({ meals }) => setRecipeInfo(meals[0]));
  }, []);

  return (
    <ProgressCard
      photo={ strMealThumb }
      title={ strMeal }
      category={ strCategory }
      ingredients={ ingredientsList }
      measures={ measuresList }
      instructions={ strInstructions }
    />
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default FoodInProgress;
