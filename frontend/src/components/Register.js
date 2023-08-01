// import React from 'react';;
import DataAccessForm from './DataAccessForm';
import { Link } from 'react-router-dom';

function Register({ isLoading, handleRegister }) {
  return (
    <DataAccessForm
      title="Регистрация"
      name="register"
      buttonText={isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      onSubmit={handleRegister}
    >
      <p className="data_access__subtitle">
        Уже зарегистрированы?{' '}
        <Link to="/sing-in" className="data_access__link">
          Войти
        </Link>
      </p>
    </DataAccessForm>
  );
}

export default Register;
