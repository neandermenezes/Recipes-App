import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Beverage from '../pages/Beverage';
import RecipesProvider from '../context/RecipesProvider';

describe('Página principal de comidas', () => {
  beforeEach(() => {
    renderWithRouter(<RecipesProvider><Beverage /></RecipesProvider>);
  });

  it('A tela possui os 12 data-testids dos cards', async () => {
    const card0 = await screen.findByTestId('0-recipe-card');
    const card1 = await screen.findByTestId('1-recipe-card');
    const card2 = await screen.findByTestId('2-recipe-card');
    const card3 = await screen.findByTestId('3-recipe-card');
    const card4 = await screen.findByTestId('4-recipe-card');
    const card5 = await screen.findByTestId('5-recipe-card');
    const card6 = await screen.findByTestId('6-recipe-card');
    const card7 = await screen.findByTestId('7-recipe-card');
    const card8 = await screen.findByTestId('8-recipe-card');
    const card9 = await screen.findByTestId('9-recipe-card');
    const card10 = await screen.findByTestId('10-recipe-card');
    const card11 = await screen.findByTestId('11-recipe-card');

    const cards = [card0, card1, card2, card3, card4, card5,
      card6, card7, card8, card9, card10, card11];

    cards.forEach((card) => {
      expect(card).toBeInTheDocument();
      expect(card).toHaveTextContent(/Info receita/i);
    });
  });

  it('Testa botões de filtro', () => {
    const filterButtons = screen.getAllByRole('button');
    filterButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });
});
