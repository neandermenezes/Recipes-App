import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ConcludedRecipes from '../pages/ConcludedRecipes';

describe('Testes para a página de receitas concluidas', () => {
  const recipes = [{ id: '52977', type: 'comida', area: 'Turkish', category: 'Side', alcoholicOrNot: '', name: 'Corba', image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', doneDate: '2022-01-18T04:04:05.927Z', tags: 'Soup' }, { id: '53026', type: 'comida', area: 'Egyptian', category: 'Vegetarian', alcoholicOrNot: '', name: 'Tamiya', image: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg', doneDate: '2022-01-18T04:05:48.582Z', tags: '' }, { id: '15288', type: 'bebida', area: '', category: 'Shot', alcoholicOrNot: 'Alcoholic', name: '252', image: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg', doneDate: '2022-01-18T04:07:39.765Z', tags: '' }, { id: '17203', type: 'bebida', area: '', category: 'Ordinary Drink', alcoholicOrNot: 'Alcoholic', name: 'Kir', image: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg', doneDate: '2022-01-18T04:08:33.276Z', tags: 'IBA,ContemporaryClassic' }];

  beforeEach(() => {
    window.localStorage.setItem('doneRecipes', JSON.stringify(recipes));
  });
  afterEach(() => window.localStorage.clear());

  it('Testa se os devidos elementos estão presentes na tela', () => {
    renderWithRouter(<ConcludedRecipes />);
    const btnAll = screen.getByTestId('filter-by-all-btn');
    const btnFood = screen.getByTestId('filter-by-food-btn');
    const btnDrinks = screen.getByTestId('filter-by-drink-btn');
    const recipesImg = recipes.map((_item, index) => (
      screen.getByTestId(`${index}-horizontal-image`)
    ));
    const recipesCategory = recipes.map((_item, index) => (
      screen.getByTestId(`${index}-horizontal-top-text`)
    ));
    const recipesName = recipes.map((_item, index) => (
      screen.getByTestId(`${index}-horizontal-name`)
    ));
    const recipesDate = recipes.map((_item, index) => (
      screen.getByTestId(`${index}-horizontal-done-date`)
    ));
    const recipesShare = recipes.map((_item, index) => (
      screen.getByTestId(`${index}-horizontal-share-btn`)
    ));
    /* recipes.map((item, index) => (
      item.tags.map((tag, i) => screen.getByTestId(`${index}-${tag[i]}-horizontal-tag`))
    )); */

    const recipeTags1 = screen.getByTestId('0-Soup-horizontal-tag');
    const recipeTags2 = screen.getByTestId('3-IBA-horizontal-tag');
    const recipeTags3 = screen.getByTestId('3-ContemporaryClassic-horizontal-tag');

    const recipesTag = [recipeTags1, recipeTags2, recipeTags3];

    recipesImg.forEach((img) => expect(img).toBeInTheDocument());
    recipesName.forEach((name) => expect(name).toBeInTheDocument());
    recipesCategory.forEach((category) => expect(category).toBeInTheDocument());
    recipesDate.forEach((date) => expect(date).toBeInTheDocument());
    recipesShare.forEach((share) => expect(share).toBeInTheDocument());
    recipesTag.forEach((tag) => expect(tag).toBeInTheDocument());
    expect(btnAll).toBeInTheDocument();
    expect(btnFood).toBeInTheDocument();
    expect(btnDrinks).toBeInTheDocument();
  });

  it('Testa se o link é copiado ao clicar no botão', () => {
    renderWithRouter(<ConcludedRecipes />);

    const btnShare = screen.getByTestId('0-horizontal-share-btn');

    userEvent.click(btnShare);

    const textShare = screen.getByText('Link copiado!');

    expect(textShare).toBeInTheDocument();
  });

  it('Testa os botões de filtro', () => {
    renderWithRouter(<ConcludedRecipes />);

    const TOTAL_LENGTH = 3;

    const btnAll = screen.getByText('All');
    const btnFood = screen.getByTestId('filter-by-food-btn');
    const btnDrink = screen.getByTestId('filter-by-drink-btn');
    const recipesName = recipes.map((_item, index) => (
      screen.getByTestId(`${index}-horizontal-name`)
    ));

    expect(btnAll).toBeInTheDocument();
    expect(btnFood).toBeInTheDocument();
    expect(btnDrink).toBeInTheDocument();
    recipesName.forEach((name) => expect(name).toBeInTheDocument());
    expect(recipesName).toHaveLength(TOTAL_LENGTH);

    userEvent.click(btnFood);

    const concludedRecipesFood = screen.getAllByRole('listitem');

    expect(concludedRecipesFood).toHaveLength(1);

    userEvent.click(btnDrink);

    const concludedRecipesDrink = screen.getAllByRole('listitem');

    expect(concludedRecipesDrink).toHaveLength(2);

    userEvent.click(btnAll);

    expect(concludedRecipesDrink).toHaveLength(TOTAL_LENGTH);
  });

  it('Texta se ao clicar na receita, o link é redirencionado', () => {
    const { history } = renderWithRouter(<ConcludedRecipes />);

    const recipe = screen.getByTestId('0-horizontal-name');

    userEvent.click(recipe);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas/52977');
  });
});
