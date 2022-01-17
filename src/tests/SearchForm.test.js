import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import SearchForm from '../components/SearchForm';
import Food from '../pages/Food';

describe('Testa o Search Form', () => {
  it('Testa a renderização do Search Form em Foods', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Food><SearchForm /></Food>
      </RecipesProvider>,
    );
    history.push('/comidas');
    const searchBtn = await screen.getByTestId('search-top-btn');
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    const header = screen.getByTestId('page-title');
    const searchBar = await screen.getByTestId('search-input');
    const executeBtn = await screen.getByTestId('exec-search-btn');
    const ingredientRadio = await screen.getByTestId('ingredient-search-radio');
    const nameRadio = await screen.getByTestId('name-search-radio');
    const letterRadio = await screen.getByTestId('first-letter-search-radio');

    expect(header).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(executeBtn).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(letterRadio).toBeInTheDocument();

    userEvent.click(nameRadio);

    userEvent.type(searchBar, 'aaaaaaaa');
    userEvent.click(executeBtn);

    console.log(history);

    // const card = await screen.findByTestId('0-recipe-card');
    // expect(card).not.toBeInTheDocument();
  });
});
