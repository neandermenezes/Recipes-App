import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { requestCategories } from '../services/fetchAPIs';

const MAX_MAP_LENGTH = 5;

function FilterButtons({ url, type }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    requestCategories(url)
      .then((items) => (setCategories(items[type])));
  }, [type, url]);

  const renderButtons = categories.slice(0, MAX_MAP_LENGTH);

  return (
    <div>
      {renderButtons && renderButtons.map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          data-testid={ `${strCategory}-category-filter` }
        >
          { strCategory }
        </button>
      ))}
    </div>
  );
}

FilterButtons.propTypes = {
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default FilterButtons;
