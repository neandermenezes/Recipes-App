import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import BeverageInProgress from '../pages/BeverageInProgress';

const props = { match: { params: { id: '17222' } } };

describe('Receita de comida em progresso', () => {
  it('se a foto, nome da receita, categoria aparecem, ingredientes e instruções aparecem',
    async () => {
      renderWithRouter(
        <RecipesProvider><BeverageInProgress { ...props } /></RecipesProvider>,
      );
      const photo = await screen.findByTestId('recipe-photo');
      const category = await screen.findByTestId('recipe-category');
      const title = await screen.findByTestId('recipe-title');
      const ingredient0 = await screen.findByTestId('0-ingredient-step');
      const ingredient1 = await screen.findByTestId('1-ingredient-step');
      const ingredient2 = await screen.findByTestId('2-ingredient-step');
      const ingredient3 = await screen.findByTestId('3-ingredient-step');
      const instructions = await screen.findByTestId('instructions');

      const elements = [photo, category, title, ingredient0, ingredient1,
        ingredient2, instructions, ingredient3];

      elements.forEach((element) => expect(element).toBeInTheDocument());
    });
    it('se marcar todos os ingredientes como feito, habilita o botão de finalizar', async () => {
      
    })
});
