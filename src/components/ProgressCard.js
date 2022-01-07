import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { setRecipeProgress } from '../services/localStorage';

function ProgressCard({
  photo,
  title,
  category,
  ingredients,
  measures,
  instructions,
  type,
  id
}) {
  const history = useHistory();


  function checkIngredientChange({ target: { checked }}, index) {
    if(checked) {
      const ojbStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const ingredients = ojbStorage[type][id] ? [...ojbStorage[type][id], index] : [index];
      const result = ojbStorage[type].length ? {...ojbStorage, [type]: { [id]: ingredients } } : {...ojbStorage, [type]: { ...ojbStorage[type], [id]: ingredients } }
      setRecipeProgress(result)

      const liSearch = document.querySelectorAll('li')[index].innerText
      const liResult = ('<s>' + liSearch + '</s>')
      document.querySelectorAll('li')[index].innerHTML = liResult;

      console.log(liSearch)
    } else {
      const ojbStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const ingredients = ojbStorage[type][id].filter((item) => item != index);
      const result = ojbStorage[type].length ? {...ojbStorage, [type]: { [id]: ingredients } } : {...ojbStorage, [type]: { ...ojbStorage[type], [id]: ingredients } }
      setRecipeProgress(result)

      const liSearch = document.querySelectorAll('li')[index].innerText
      document.querySelectorAll('li')[index].innerHTML = liSearch;
    }
  }

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
          <div>
            <li key={ item } data-testid={ `${index}-ingredient-step` }>
              {`${item} - ${measures[index]}`}

              {/* TEM QUE FAZER ISSO AQUI RISCAR O ITEM */}
            </li>
            <input
            onChange={ (e) => checkIngredientChange(e, index) }
            onClick={ ({ target }) => console.log(index, target.checked) }
            type="checkbox"
            />
          </div>
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
