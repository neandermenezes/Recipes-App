import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import RecipesContext from '../context/RecipesContext';
import { fetchAPIfoods, fetchAPIdrinks } from '../services/fetchAPIs';

function SearchForm() {
  const { setFilteredFood, setFilteredBeverage } = useContext(RecipesContext);
  const [searchText, setSearchText] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('');
  const history = useHistory();

  const handleRadio = ({ target: { value } }) => {
    setSelectedRadio(value);
  };

  const alertLetter = () => {
    alert('Sua busca deve conter somente 1 (um) caracter');
  };

  const redirectByLength = (result, category) => {
    if (result.length === 1) {
      const id = category === 'comidas' ? 'idMeal' : 'idDrink';
      history.push(`/${category}/${result[0][id]}`);
    } else {
      return category
      === 'comidas' ? setFilteredFood(result) : setFilteredBeverage(result);
    }
  };

  const handleClick = async () => {
    if (selectedRadio === 'letter' && searchText.length > 1) {
      return alertLetter();
    }

    const { pathname } = history.location;

    try {
      if (pathname === '/bebidas' || pathname === '/bebidas/') {
        const result = await fetchAPIdrinks(searchText, selectedRadio);
        redirectByLength(result.drinks, 'bebidas');
      } else {
        const result = await fetchAPIfoods(searchText, selectedRadio);
        redirectByLength(result.meals, 'comidas');
      }
    } catch (error) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return error;
    }
  };

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target: { value } }) => setSearchText(value) }
      />
      <div>
        <label htmlFor="ingredient">
          Ingrediente
          <input
            id="ingredient"
            name="searchType"
            type="radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ handleRadio }
          />
        </label>
        <label htmlFor="name">
          Nome
          <input
            id="name"
            name="searchType"
            type="radio"
            value="name"
            data-testid="name-search-radio"
            onChange={ handleRadio }
          />
        </label>
        <label htmlFor="letter">
          Letra
          <input
            id="letter"
            name="searchType"
            type="radio"
            value="letter"
            data-testid="first-letter-search-radio"
            onChange={ handleRadio }
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Busca

      </button>
    </form>
  );
}

export default SearchForm;
