import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const redirect = (redirectTo) => {
    console.log(redirectTo);
    if (redirectTo === 'done-recipes') return history.push('/receitas-feitas');
    if (redirectTo === 'favorite-recipes') return history.push('/receitas-favoritas');
    history.push('/');
    localStorage.clear();
  };

  return (
    <>
      <Header name="Perfil" />
      <div className="profile">
        <p data-testid="profile-email">{email}</p>
        <div>
          <button
            onClick={ () => redirect('done-recipes') }
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
          <button
            onClick={ () => redirect('favorite-recipes') }
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
          <button
            onClick={ () => redirect('login') }
            type="button"
            data-testid="profile-logout-btn"
          >
            Sair
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
