import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestAreas } from '../services/fetchAPIs';

function DropdownArea({ handleArea }) {
  const [mealsArea, setMealsArea] = useState([]);

  useEffect(() => {
    requestAreas('themealdb')
      .then(({ meals }) => setMealsArea(meals));
  }, []);

  return (
    <select
      onChange={ ({ target }) => handleArea(target.value) }
      data-testid="explore-by-area-dropdown"
    >
      <option data-testid="All-option" value="All">All</option>
      {mealsArea.map(({ strArea }) => (
        <option data-testid={ `${strArea}-option` } key={ strArea }>
          {strArea}
        </option>
      ))}
    </select>
  );
}

DropdownArea.propTypes = {
  handleArea: PropTypes.func.isRequired,
};

export default DropdownArea;
