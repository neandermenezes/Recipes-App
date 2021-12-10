import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function FoodExplorer() {
  const history = useHistory();
  return (
    <div>
      <Header name="Explorar Comidas" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/FoodExplorerByIngredients') }
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => {} }
      >
        Me surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default FoodExplorer;
