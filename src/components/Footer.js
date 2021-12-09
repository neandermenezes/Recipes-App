import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" className="footer">
      <button
        src={ drinkIcon }
        onClick={ () => history.push('/bebidas') }
        type="button"
        data-testid="drinks-bottom-btn"
      >
        <img className="footer__icon" src={ drinkIcon } alt="drinks icon" />
      </button>
      <button
        src={ exploreIcon }
        onClick={ () => history.push('/explorar') }
        type="button"
        data-testid="explore-bottom-btn"
      >
        <img className="footer__icon" src={ exploreIcon } alt="explore icon" />
      </button>
      <button
        src={ mealIcon }
        onClick={ () => history.push('/comidas') }
        type="button"
        data-testid="food-bottom-btn"
      >
        <img className="footer__icon" src={ mealIcon } alt="meal icon" />
      </button>
    </footer>
  );
}

export default Footer;
