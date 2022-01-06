import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ProgressCard({
  photo,
  title,
  category,
  ingredients,
  measures,
  instructions,
}) {
  const history = useHistory();

  return (
    <div>
      <img data-testid="recipe-photo" src={ photo } alt="meal info" />
      <button type="button" data-testid="share-btn">
        COMPARTILHAR
      </button>
      <button type="button" data-testid="favorite-btn">
        FAVORITO
      </button>
      <h1 data-testid="recipe-title">{title}</h1>
      <p data-testid="recipe-category">{category}</p>
      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={ item } data-testid={ `${index}-ingredient-step` }>
            {`${item} - ${measures[index]}`}
            <input
              onClick={ ({ target }) => console.log(index, target.checked) }
              type="checkbox"
            />
            {/* TEM QUE FAZER ISSO AQUI RISCAR O ITEM */}
          </li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p data-testid="instructions">{instructions}</p>
      <button
        onClick={ () => history.push('/receitas-feitas') }
        type="button"
        data-testid="finish-recipe-btn"
      >
        FINILIZAR
      </button>
    </div>
  );
}

ProgressCard.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.string.isRequired,
  measures: PropTypes.string.isRequired,
  instructions: PropTypes.string.isRequired,
};

//  PROPTYPES TA ERRADO

export default ProgressCard;
