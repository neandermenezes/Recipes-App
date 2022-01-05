import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Card({ index, header, img, id, itemId, testId }) {
  const urlByCategory = id === 'idMeal' ? 'comidas' : 'bebidas';
  return (
    <Link to={ `/${urlByCategory}/${itemId}` }>
      <div data-testid={ testId }>
        <img
          src={ img }
          alt={ header }
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-card-name` }>
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
