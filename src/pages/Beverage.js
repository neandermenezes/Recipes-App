import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';

const MAX_MAP_LENGTH = 12;

function Beverage() {
  const { filteredBeverage } = useContext(RecipesContext);
  const slicedFilteredBeverage = filteredBeverage.slice(0, MAX_MAP_LENGTH);
  return (
    <div>
      <Header name="Bebidas" search />
      { slicedFilteredBeverage && slicedFilteredBeverage.map((beverage, index) => (
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
