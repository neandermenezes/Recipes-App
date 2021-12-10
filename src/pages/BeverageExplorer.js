import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function BeverageExplorer() {
  const history = useHistory();

  const handleSurprise = async () => {
    
  }
  return (
    <>
      <Header name="Explorar Bebidas" />
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/BeverageExplorerByIngredients') }
      >
        Por Ingredientes
      </button>
      <button
        data-testid="explore-by-area"
        type="button"
        onClick={ () => history.push('/BeverageExplorerByArea') }
      >
        Por Local de Origem
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ () => handleSurprise }
      >
        Me surpreenda!
      </button>
      <Footer />
    </>
  );
}

export default BeverageExplorer;
