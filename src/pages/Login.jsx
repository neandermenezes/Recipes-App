import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MIN_PASSWORD_LENGTH = 6;

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonState, setButtonState] = useState(true);

  const handleChange = async ({ target: { id, value } }) => {
    if (id === 'email') setEmail(value);
    else setPassword(value);
  };

  useEffect(() => {
    if (password.length > MIN_PASSWORD_LENGTH
        && /\S+@\S+\.\S+/.test(email)) setButtonState(false);
    else setButtonState(true);
  }, [email, password]);

  const saveAndRedirect = () => {
    const objEmail = { email };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(objEmail));
    history.push('/comidas');
  };

  return (
    <form className="login">
      <label htmlFor="email" className="login__label">
        Email
        <input
          onChange={ handleChange }
          data-testid="email-input"
          id="email"
          type="email"
        />
      </label>
      <label htmlFor="email" className="login__label">
        password
        <input
          onChange={ handleChange }
          data-testid="password-input"
          id="password"
          type="password"
        />
      </label>
      <div>
        <button
          disabled={ buttonState }
          type="button"
          onClick={ saveAndRedirect }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </div>
    </form>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
