import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import DropdownArea from '../components/DropdownArea';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { MAX_MAP_LENGTH } from '../context/RecipesProvider';
import { requestRecipesByArea } from '../services/fetchAPIs';

function FoodExplorerByArea() {
  const [areaSelected, setAreaSelected] = useState('All');
  const [mealsByArea, setMealsByArea] = useState([]);

  useEffect(() => {
    requestRecipesByArea(areaSelected)
      .then(({ meals }) => setMealsByArea(meals.slice(0, MAX_MAP_LENGTH)));
  }, [areaSelected]);

  const handleSelectedOption = (area) => {
    setAreaSelected(area);
  };

  console.log(mealsByArea);

  return (
    <div>
      <Header name="Explorar Origem" search />
      <DropdownArea handleArea={ handleSelectedOption } />
      { mealsByArea.map((meal, index) => (
        <Card
          id="idMeal"
          itemId={ meal.idMeal }
          header={ meal.strMeal }
          img={ meal.strMealThumb }
          index={ index }
          key={ meal.idMeal }
          testId={ `${index}-recipe-card` }
        />
      )) }
      <Footer />
    </div>
  );
}

export default FoodExplorerByArea;
