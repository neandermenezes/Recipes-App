import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Food from '../pages/Food';
import RecipesProvider from '../context/RecipesProvider';

describe('Testa o Search Form', () => {
  it('Testa a renderização do Search Form em Foods', async () => {
    renderWithRouter(<RecipesProvider><Food /></RecipesProvider>);
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

    userEvent.type(searchBar, 'Corba');
    userEvent.click(executeBtn);
  });
});
