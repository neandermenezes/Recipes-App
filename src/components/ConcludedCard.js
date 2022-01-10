import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function ConcludedCard({ type,
  mainIndex,
  id,
  topText,
  handleShare,
  isCopied,
  name,
  image,
  doneDate,
  tags }) {
  const [arrayTags, setArrayTags] = useState([]);
  useEffect(() => {
    if (tags) {
      const array = tags !== '' ? tags.toString().split(',') : [];
      return setArrayTags(array);
    }
  }, [tags]);
  return (
    <>
      <Link to={ `/${type}/${id}` }>
        <img
          data-testid={ `${mainIndex}-horizontal-image` }
          src={ image }
          alt={ name }
          className="favorite-image"
        />
        <h3 data-testid={ `${mainIndex}-horizontal-name` }>
          { name }
        </h3>
      </Link>
      <h4 data-testid={ `${mainIndex}-horizontal-top-text` }>
        { topText }
      </h4>
      <p data-testid={ `${mainIndex}-horizontal-done-date` }>{ doneDate }</p>
      <button
        type="button"
        onClick={ handleShare }
      >
        <img
          src={ shareIcon }
          alt="share"
          id={ `${type}/${id}` }
          data-testid={ `${mainIndex}-horizontal-share-btn` }
        />
      </button>
      {isCopied && <p>Link copiado!</p>}
      <ul>
        {arrayTags.map((tag) => (
          <li
            key={ tag }
            data-testid={ `${mainIndex}-${tag}-horizontal-tag` }
          >
            {tag}
          </li>))}
      </ul>
    </>
  );
}

ConcludedCard.propTypes = {
  type: PropTypes.string.isRequired,
  mainIndex: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  topText: PropTypes.string.isRequired,
  handleShare: PropTypes.func.isRequired,
  isCopied: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
export default ConcludedCard;
