import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';

const MAX_MAP_LENGTH = 12;

function Food() {
  const { filteredFood } = useContext(RecipesContext);
  const slicedFilteredFood = filteredFood.slice(0, MAX_MAP_LENGTH);
  return (
    <div>
      <Header name="Comidas" search />
      { slicedFilteredFood && slicedFilteredFood.map((food, index) => (
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
