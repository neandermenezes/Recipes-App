import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [filteredFood, setFilteredFood] = useState([]);
  const [filteredBeverage, setFilteredBeverage] = useState([]);

  const contextValue = { filteredFood,
    setFilteredFood,
    filteredBeverage,
    setFilteredBeverage };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
