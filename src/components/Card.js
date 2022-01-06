import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card({ index, header, img, id, itemId, testId }) {
  const urlByCategory = id === 'idMeal' ? 'comidas' : 'bebidas';
  return (
    <Link to={ `/${urlByCategory}/${itemId}` }>
      <div className="recipe-card" data-testid={ testId }>
        <img
          className="recipe-card__image"
          src={ img }
          alt={ header }
          data-testid={ `${index}-card-img` }
        />
        <h3
          data-testid={ `${index}-${testId.includes('recomendation')
            ? 'recomendation-title' : 'card-name'}` }
          className="recomended-card__title"
        >
          {header}
        </h3>
      </div>
    </Link>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default Card;
