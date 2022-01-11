import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function IngredientCard({ type, index, img, ingredient }) {
  const newTo = {
    pathname: `/${type}`,
    ingredient,
  };
  return (
    <Link to={ newTo }>
      <div className="recipe-card" data-testid={ `${index}-ingredient-card` }>
        <img
          className="recipe-card__image ingredient-img"
          src={ img }
          alt={ ingredient }
          data-testid={ `${index}-card-img` }
        />
        <h3
          className="recipe-card__title align-card-header"
          data-testid={ `${index}-card-name` }
        >
          {ingredient}
        </h3>
        <p className="recipe-card__redirect align-card-redirect">
          <span className="recipe-card__arrow">&#8594;</span>
          Info receita
        </p>
      </div>
    </Link>
  );
}

IngredientCard.propTypes = {
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  ingredient: PropTypes.string.isRequired,
};

export default IngredientCard;
