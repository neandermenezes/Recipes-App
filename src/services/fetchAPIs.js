export async function fetchAPIdrinks(text, radio) {
  if (radio === 'ingredient') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${text}`);
    const result = await response.json();
    return result;
  } if (radio === 'name') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${text}`);
    const result = await response.json();
    return result;
  }
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${text}`);
  const result = await response.json();
  return result;
}

export async function fetchAPIfoods(text, radio) {
  if (radio === 'ingredient') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`);
    const result = await response.json();
    return result;
  } if (radio === 'name') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
    const result = await response.json();
    return result;
  }
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${text}`);
  const result = await response.json();
  return result;
}

export async function fetchAPIRandomFoodOrDrink(category) {
  const urlByCategory = category === 'food' ? 'themealdb' : 'thecocktaildb';
  const response = await fetch(`https://www.${urlByCategory}.com/api/json/v1/1/random.php`);
  const result = await response.json();
  return result;
}
