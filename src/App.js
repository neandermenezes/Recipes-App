import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Food from './pages/Food';
import Beverage from './pages/Beverage';
import FoodDetails from './pages/FoodDetails';
import BeverageDetails from './pages/BeverageDetails';
import FoodInProgress from './pages/FoodInProgress';
import BeverageInProgress from './pages/BeverageInProgress';
import Explorer from './pages/Explorer';
import FoodExplorer from './pages/FoodExplorer';
import BeverageExplorer from './pages/BeverageExplorer';
import FoodExplorerByIngredients from './pages/FoodExplorerByIngredients';
import BeverageExplorerByIngredients from './pages/BeverageExplorerByIngredients';
import FoodExplorerByArea from './pages/FoodExplorerByArea';
import Profile from './pages/Profile';
import ConcludedRecipes from './pages/ConcludedRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <Switch>
      <Route exact to="/" component={ Login } />
      <Route exact to="/comidas" component={ Food } />
      <Route exact to="/bebidas" component={ Beverage } />
      <Route exact to="/comidas/:id" component={ FoodDetails } />
      <Route exact to="/bebidas/:id" component={ BeverageDetails } />
      <Route
        exact
        to="/comidas/:id/in-progress"
        component={ FoodInProgress }
      />
      <Route
        exact
        to="/bebidas/:id/in-progress"
        component={ BeverageInProgress }
      />
      <Route exact to="/explorar" component={ Explorer } />
      <Route exact to="/explorar/comidas" component={ FoodExplorer } />
      <Route exact to="/explorar/bebidas" component={ BeverageExplorer } />
      <Route
        exact
        to="/explorar/comidas/ingredientes"
        component={ FoodExplorerByIngredients }
      />
      <Route
        exact
        to="/explorar/bebidas/ingredientes"
        component={ BeverageExplorerByIngredients }
      />
      <Route
        exact
        to="/explorar/comidas/area"
        component={ FoodExplorerByArea }
      />
      <Route exact to="/perfil" component={ Profile } />
      <Route exact to="/receitas-feitas" component={ ConcludedRecipes } />
      <Route exact to="/receitas-favoritas" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
