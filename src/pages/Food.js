import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import { requestFoodsOrDrinks } from '../services/fetchAPIs';

const MAX_MAP_LENGTH = 12;

function Food() {
  const [foods, setFoods] = useState([]);
  const { filteredFood } = useContext(RecipesContext);

  useEffect(() => {
    requestFoodsOrDrinks('themealdb')
      .then(({ meals }) => setFoods(meals));
  }, []);

  const results = filteredFood.length > 0 ? filteredFood : foods;
  const renderFoods = results.slice(0, MAX_MAP_LENGTH);

  return (
    <div>
      <Header name="Comidas" search />
      { renderFoods && renderFoods.map((food, index) => (
        <Card
          header={ food.strMeal }
          img={ food.strMealThumb }
          index={ index }
          key={ food.idMeal }
        />
      )) }
      <Footer />
    </div>
  );
}

export default Food;
