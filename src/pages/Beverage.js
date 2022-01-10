import React, { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { requestFoodsOrDrinks } from '../services/fetchAPIs';
import Card from '../components/Card';
import FilterButtons from '../components/FilterButtons';
import '../css/MainPage.css';

const MAX_MAP_LENGTH = 12;

function Beverage() {
  const [beverages, setBeverages] = useState();
  const [renderBeverage, setRenderBeverage] = useState([]);
  const { filteredBeverage } = useContext(RecipesContext);

  useEffect(() => {
    requestFoodsOrDrinks('thecocktaildb')
      .then(({ drinks }) => setBeverages(drinks));
  }, []);

  useEffect(() => {
    const results = filteredBeverage.length > 0 ? filteredBeverage : beverages;
    if (results) setRenderBeverage(results.slice(0, MAX_MAP_LENGTH));
  }, [filteredBeverage, beverages]);

  return (
    <div className="page-container">
      <Header name="Bebidas" search />
      <FilterButtons url="thecocktaildb" type="drinks" />
      <main className="recipes">
        { renderBeverage && renderBeverage.map((beverage, index) => (
          <Card
            id="idDrink"
            itemId={ beverage.idDrink }
            header={ beverage.strDrink }
            img={ beverage.strDrinkThumb }
            index={ index }
            key={ beverage.idDrink }
            testId={ `${index}-recipe-card` }
          />
        )) }
        <Footer />
      </main>
    </div>
  );
}

export default Beverage;
