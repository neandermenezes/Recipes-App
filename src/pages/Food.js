import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import { requestFoodsOrDrinks } from '../services/fetchAPIs';
import FilterButtons from '../components/FilterButtons';

const MAX_MAP_LENGTH = 12;

function Food() {
  const [foods, setFoods] = useState([]);
  const [renderFoods, setRenderFoods] = useState([]);
  const { filteredFood } = useContext(RecipesContext);

  useEffect(() => {
    requestFoodsOrDrinks('themealdb')
      .then(({ meals }) => setFoods(meals));
  }, []);

  useEffect(() => {
    const results = filteredFood.length > 0 ? filteredFood : foods;
    setRenderFoods(results.slice(0, MAX_MAP_LENGTH));
  }, [filteredFood, foods]);

  return (
    <div className="page-container">
      <Header name="Comidas" search />
      <FilterButtons url="themealdb" type="meals" />
      { renderFoods && renderFoods.map((food, index) => (
        <Card
          id="idMeal"
          itemId={ food.idMeal }
          header={ food.strMeal }
          img={ food.strMealThumb }
          index={ index }
          key={ food.idMeal }
          testId={ `${index}-recipe-card` }
        />
      )) }
      <Footer />
    </div>
  );
}

export default Food;
