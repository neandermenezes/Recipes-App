import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Footer from '../components/Footer';
import Login from '../pages/Login';
import App from '../App';

const drinksBtn = 'drinks-bottom-btn';
const exploreBtn = 'explore-bottom-btn';
const foodBtn = 'food-bottom-btn';
const testPhrase = 'Redireciona para a rota correta';

describe('19 - Verifica se tem os data-testids '
+ 'footer, drinks-bottom-btn, explore-bottom-btn e food-bottom-btn', () => {
  it('Verifica o data-testid footer', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Verifica o drinks-bottom-btn', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByTestId(drinksBtn)).toBeInTheDocument();
  });
  it('Verifica o explore-bottom-btn', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByTestId(exploreBtn)).toBeInTheDocument();
  });
  it('Verifica o food-bottom-btn', () => {
    renderWithRouter(<Footer />);
    expect(screen.getByTestId(foodBtn)).toBeInTheDocument();
  });
});

describe('20 - Verifica se o menu inferior está de forma fixa e apresenta 3 ícones, '
+ 'um para comidas, um para bebidas e outro para exploração', () => {
  it('Verifica se o menu inferior está fixado sempre ao final da página', async () => {
    renderWithRouter(<Footer />);
    expect(screen.getByTestId('footer')).toHaveStyle('position: fixed');
    expect(screen.getByTestId('footer')).toHaveStyle('bottom: 0');
  });
  it('Verifica se apresenta os ícones corretos', () => {
    renderWithRouter(<Footer />);
    const elementDrinksBtn = screen.getByTestId(drinksBtn);
    const elementExploreBtn = screen.getByTestId(exploreBtn);
    const elementFoodBtn = screen.getByTestId(foodBtn);
    expect(elementDrinksBtn).toHaveAttribute('src', 'drinkIcon.svg');
    expect(elementExploreBtn).toHaveAttribute('src', 'exploreIcon.svg');
    expect(elementFoodBtn).toHaveAttribute('src', 'mealIcon.svg');
  });
});

describe('21 - Verifica se o menu inferior é exibido apenas nas telas '
  + 'indicadas pelo protótipo', () => {
  it('Não tem footer na tela de login', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
  it('Tem footer na tela de principal de receitas de comidas', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Não tem footer na tela de detalhes de uma receita de bebida', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/:id');
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de receita em processo de comida', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/comidas/:id/in-progress');
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de receita em processo de bebida', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/bebidas/:id/in-progress');
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
  it('Tem footer na tela de explorar', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/explorar');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar comidas', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar bebidas', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar comidas por ingrediente', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/ingredientes');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar bebidas por ingrediente', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas/ingredientes');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar comidas por local de origem', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/explorar/comidas/area');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Tem footer na tela de perfil', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/perfil');
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Não tem footer na tela de receitas feitas', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-feitas');
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de receitas favoritas', () => {
    renderWithRouter(<Login />);
    const { history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });
});

describe('22 - Verifica se redireciona a pessoa usuária para uma lista de cooktails'
  + ' ao clicar no ícone de bebidas', () => {
  it(testPhrase, () => {
    const { history } = renderWithRouter(<Footer />);
    const bebidasLink = screen.getByTestId(drinksBtn);
    userEvent.click(bebidasLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });
});

describe('23 - Verifica se redireciona a pessoa usuária para a tela'
  + ' de  explorar ao clicar no ícone de exploração', () => {
  it(testPhrase, () => {
    const { history } = renderWithRouter(<Footer />);
    const explorerLink = screen.getByTestId(exploreBtn);
    userEvent.click(explorerLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
});

describe('24 - Verifica se redireciona a pessoa usuária para uma lista de comidas'
  + ' ao clicar no ícone de comidas', () => {
  it(testPhrase, () => {
    const { history } = renderWithRouter(<Footer />);
    const comidasLink = screen.getByTestId(foodBtn);
    userEvent.click(comidasLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
