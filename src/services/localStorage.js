export function getFavoriteRecipes() {
  return JSON.parse(localStorage.getItem('favoriteRecipes'));
}

export function setFavoriteRecipes(value) {
  return localStorage.setItem('favoriteRecipes', JSON.stringify(value));
}

export function getRecipeProgress() {
  return JSON.parse(localStorage.getItem('inProgressRecipes'));
}

export function setRecipeProgress(value) {
  return localStorage.setItem('inProgressRecipes', JSON.stringify(value));
}
