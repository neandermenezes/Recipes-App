import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { requestIngredients } from '../services/fetchAPIs';
import IngredientCard from '../components/IngredientCard';

const NUMBER_OF_INGREDIENTS = 12;

function BeverageExplorerByIngredients() {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    requestIngredients('thecocktaildb')
      .then(({ drinks }) => drinks.map(({ strIngredient1 }) => strIngredient1))
      .then((result) => setIngredients(result.slice(0, NUMBER_OF_INGREDIENTS)));
  }, []);
  return (
    <>
      <Header name="Explorar Ingredientes" />
      {ingredients.length > 0 && ingredients.map((ingredient, index) => (
        <IngredientCard
          key={ ingredient }
          ingredient={ ingredient }
          type="bebidas"
          img={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
          index={ index }
        />
      ))}
      <Footer />
    </>
  );
}

export default BeverageExplorerByIngredients;
