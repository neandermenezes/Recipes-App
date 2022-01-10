import { getRecipeProgress, setRecipeProgress } from '../services/localStorage';

function checkIngredientChange([checked, index, type, id, liSearch]) {
  const recipesInProgressStorage = getRecipeProgress();
  liSearch.classList.toggle('selected_step', checked);

  let newArrayOfIngredients = [];

  if (checked) {
    newArrayOfIngredients = recipesInProgressStorage[type][id]
      ? [...recipesInProgressStorage[type][id], index] : [index];
  } else {
    newArrayOfIngredients = recipesInProgressStorage[type][id]
      .filter((item) => item !== index);
  }
  const result = recipesInProgressStorage[type].length
    ? { ...recipesInProgressStorage, [type]: { [id]: newArrayOfIngredients } }
    : { ...recipesInProgressStorage,
      [type]: { ...recipesInProgressStorage[type], [id]: newArrayOfIngredients } };

  return setRecipeProgress(result);
}

export default checkIngredientChange;
