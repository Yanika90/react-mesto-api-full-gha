import DataAccessForm from './DataAccessForm';

function Login({ isLoading, handleLogin }) {
  return (
    <DataAccessForm
      title="Вход"
      name="login"
      buttonText={isLoading ? 'Авторизация...' : 'Войти'}
      onSubmit={handleLogin}
    />
  );
}

export default Login;
