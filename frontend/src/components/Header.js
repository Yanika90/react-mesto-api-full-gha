import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ email, isLoggedIn, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип Место" />
      {isLoggedIn ? (
        <div className="header__info-block">
          <p className="header__user-email">{email}</p>
          <Link to="/sign-in" className="header__logout" onClick={onSignOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <Link
          className="header__link"
          to={location.pathname === '/sign-in' ? '/sign-up' : '/sign-in'}
        >
          {location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}
        </Link>
      )}
    </header>
  );
}

export default Header;
