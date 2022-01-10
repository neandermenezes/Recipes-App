import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function IngredientCard({ type, index, img, ingredient }) {
  const newTo = {
    pathname: `/${type}`,
    ingredient,
  };
  return (
    <div>
      <Link to={ newTo }>
        <div data-testid={ `${index}-ingredient-card` }>
          <img
            src={ img }
            alt={ ingredient }
            data-testid={ `${index}-card-img` }
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            {ingredient}
          </h3>
        </div>
      </Link>
    </div>
  );
}

IngredientCard.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
};

export default IngredientCard;
