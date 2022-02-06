# Recipes-App
Built with React, ContextAPI, ReactHooks, localStorage and much more.
We also developed tests with 90% coverage for the whole application, with React Testing Library.

## Description
Recipes App is the final project of Trybe's Front End module, it was built in 10 days in a 4 people group, Leandro, Tamyres, Marcelo and Neander [Me :)]

We use two APIs to feed the recipes info to the application
```bash
- https://www.themealdb.com/api.php
- https://www.thecocktaildb.com/api.php
```

Along its 16 pages and 12 components we used various ways to sort and interact with the recipes, Including Filter Buttons to sort, Exploring pages where you can sort either Foods or Beverages By Area, Ingredient or a SURPRISE button!!

The app also allows for a list of Favorite Recipes and an interaction with recipe in case you want to taste these delicious foods and drinks in real life! It saves the progress of the recipe and your favorite recipes using local storage, which you can later check on a special Profile page which can redirect you to your Done Recipes and Favorite Recipes.

## Design

Primary orange colour was chosen due to its link with hunger, since it's a recipe application we figured why not use some mind controlling techniques (jk). 

Since there is a lot of reusable pieces, like buttons and cards, their classes are stored in the App.css, Pages were styled in individual files and Helper classes to center divs and add margins also were put in the App.css.

The app was meant to look as clean and professional as possible, small header and footer to allow for more content space. 

360x600 was the intended screen size given by Trybe, it doesn't break in higher screen sizes but doesn't look much good either... Since it was meant to be a mobile application we didn't make the effort to scale it to bigger screens, since a complete redesign would have to take place.

## How to use this code
Clone the repositary and run

```bash
- npm install
- npm start
```
