import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProgressCard from '../components/ProgressCard';
import RecipesContext from '../context/RecipesContext';
import { requestRecipesById } from '../services/fetchAPIs';

function BeverageInProgress(props) {
  const {
    match: {
      params: { id },
    },
  } = props;

  const { sliceIngredients, sliceMeasures } = useContext(RecipesContext);
  const [recipeInfo, setRecipeInfo] = useState({});
  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = recipeInfo;

  const ingredientsList = sliceIngredients(recipeInfo);
  const measuresList = sliceMeasures(recipeInfo);

  useEffect(() => {
    requestRecipesById(id, 'thecocktaildb')
      .then(({ drinks }) => setRecipeInfo(drinks[0]));
  }, []);

  return (
    <ProgressCard
      photo={ strDrinkThumb }
      title={ strDrink }
      category={ strAlcoholic }
      ingredients={ ingredientsList }
      measures={ measuresList }
      instructions={ strInstructions }
    />
  );
}

BeverageInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default BeverageInProgress;
