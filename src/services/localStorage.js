export function getFavoriteRecipes() {
  return JSON.parse(localStorage.getItem('favoriteRecipes'));
}

export function setFavoriteRecipes(value) {
  return localStorage.setItem('favoriteRecipes', JSON.stringify(value));
}
