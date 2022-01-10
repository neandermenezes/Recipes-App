import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  requestCategories,
  requestRecipesByCategory,
} from '../services/fetchAPIs';
import RecipesContext from '../context/RecipesContext';
import '../css/FilterButtons.css';

const MAX_MAP_LENGTH = 5;

function FilterButtons({ url, type }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const {
    location: { pathname },
  } = useHistory();
  const { setFilteredFood, setFilteredBeverage } = useContext(RecipesContext);

  const filterBeverage = async (id) => {
    const btns = document.getElementById(selectedCategory);
    console.log(selectedCategory);
    console.log(btns);
    if (id === selectedCategory) {
      setSelectedCategory('');
      return setFilteredBeverage([]);
    }
    const result = await requestRecipesByCategory(id, 'thecocktaildb');
    setFilteredBeverage(result.drinks);
    return setSelectedCategory(id);
  };

  const filterFood = async (id) => {
    if (id === selectedCategory) {
      setSelectedCategory('');
      return setFilteredFood([]);
    }
    const result = await requestRecipesByCategory(id, 'themealdb');
    setFilteredFood(result.meals);
    return setSelectedCategory(id);
  };

  const handleClick = ({ target }) => {
    if (pathname === '/bebidas') return filterBeverage(target.id);
    return filterFood(target.id);
  };

  const resetFilters = () => {
    if (pathname === '/bebidas') return setFilteredBeverage([]);
    return setFilteredFood([]);
  };

  useEffect(() => {
    requestCategories(url).then((items) => setCategories(items[type]));
  }, [type, url]);

  const renderButtons = categories.slice(0, MAX_MAP_LENGTH);

  return (
    <>
      <p className="description">Categories</p>
      <div className="filters">
        {renderButtons
        && renderButtons.map(({ strCategory }) => (
          <button
            className={ selectedCategory === strCategory ? 'selected' : 'filters__btn' }
            key={ strCategory }
            type="button"
            data-testid={ `${strCategory}-category-filter` }
            id={ strCategory }
            onClick={ handleClick }
          >
            {strCategory}
          </button>
        ))}
        <button
          className="filters__btn"
          data-testid="All-category-filter"
          type="button"
          onClick={ resetFilters }
        >
          All
        </button>
      </div>
    </>
  );
}

FilterButtons.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default FilterButtons;
