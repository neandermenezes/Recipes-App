import React from 'react';
import PropTypes from 'prop-types';

function Card({ index, header, img }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        src={ img }
        alt={ header }
        data-testid={ `${index}-card-img` }
      />
      <h3 data-testid={ `${index}-card-name` }>
        {header}
      </h3>
    </div>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Card;
