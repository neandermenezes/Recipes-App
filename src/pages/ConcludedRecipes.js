import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getDoneRecipes } from '../services/localStorage';
import ConcludedCard from '../components/ConcludedCard';

const copy = require('clipboard-copy');

function ConcludedRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [renderRecipes, setRenderRecipes] = useState([]);

  useEffect(() => {
    setDoneRecipes(getDoneRecipes());
  }, []);
  useEffect(() => {
    if (filteredRecipes.length) return setRenderRecipes(filteredRecipes);
    return setRenderRecipes(doneRecipes);
  }, [filteredRecipes, doneRecipes]);

  const handleShare = async ({ target: { id } }) => {
    await copy(`http://localhost:3000/${id}`);
    setIsCopied(true);
  };

  const handleFilter = ({ target: { id } }) => {
    const type = id === 'Food' ? 'comida' : 'bebida';
    const filterDone = doneRecipes.filter((recipe) => recipe.type === type);
    setFilteredRecipes(filterDone);
  };
  const handleAll = () => {
    setFilteredRecipes([]);
  };
  return (
    <div>
      <Header name="Receitas Feitas" />
      <div>
        <button
          id="All"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleAll }
        >
          All
        </button>
        <button
          id="Food"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFilter }
        >
          Food
        </button>
        <button
          id="Drink"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilter }
        >
          Drink
        </button>
      </div>
      { renderRecipes && renderRecipes.map((recipe, index) => {
        if (recipe.type === 'comida') {
          return (
            <div key={ recipe.name }>
              <ConcludedCard
                image={ recipe.image }
                name={ recipe.name }
                type="comidas"
                mainIndex={ index }
                topText={ `${recipe.area} - ${recipe.category}` }
                id={ recipe.id }
                tags={ recipe.tags }
                handleShare={ handleShare }
                isCopied={ isCopied }
                doneDate={ recipe.doneDate }
              />
            </div>
          );
        }
        return (
          <div key={ recipe.name }>
            <ConcludedCard
              type="bebidas"
              image={ recipe.image }
              name={ recipe.name }
              id={ recipe.id }
              tags={ recipe.tags }
              mainIndex={ index }
              topText={ recipe.alcoholicOrNot }
              handleShare={ handleShare }
              isCopied={ isCopied }
              doneDate={ recipe.doneDate }
            />
          </div>
        );
      }) }
    </div>
  );
}

export default ConcludedRecipes;
