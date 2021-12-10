import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { requestFoodsOrDrinks } from '../services/fetchAPIs';
import Card from '../components/Card';
import FilterButtons from '../components/FilterButtons';

const MAX_MAP_LENGTH = 12;

function Beverage() {
  const [beverages, setBeverages] = useState();
  const { filteredBeverage } = useContext(RecipesContext);

  useEffect(() => {
    requestFoodsOrDrinks('thecocktaildb')
      .then(({ drinks }) => setBeverages(drinks));
  }, []);

  const results = filteredBeverage.length > 0 ? filteredBeverage : beverages;
  let renderBeverage = [];
  if (results) renderBeverage = results.slice(0, MAX_MAP_LENGTH);

  return (
    <div>
      <Header name="Bebidas" search />
      <FilterButtons url="thecocktaildb" type="drinks" />
      { renderBeverage && renderBeverage.map((beverage, index) => (
        <Card
          header={ beverage.strDrink }
          img={ beverage.strDrinkThumb }
          index={ index }
          key={ beverage.idDrink }
        />
      )) }
      <Footer />
    </div>
  );
}

export default Beverage;
