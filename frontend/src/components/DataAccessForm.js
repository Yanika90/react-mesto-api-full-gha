import React, { useState } from 'react';

function DataAccessForm({ title, name, children, buttonText, onSubmit }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formValue);
  }

  return (
    <div>
      <div className="data_access">
        <h2 className="data_access__title">{title}</h2>
        <form className="data_access__form" name={name} onSubmit={handleSubmit}>
          <input
            className="data_access__input data_access__input_type_email"
            type="email"
            name="email"
            placeholder="Email"
            minLength="5"
            maxLength="50"
            required
            value={formValue.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <input
            className="data_access__input data_access__input_type_password"
            type="password"
            name="password"
            placeholder="Пароль"
            minLength="8"
            maxLength="50"
            required
            value={formValue.password}
            onChange={handleChange}
            autoComplete="password"
          />
          <button className="data_access__submit" type="submit" aria-label="Войти">
            {buttonText || 'Войти'}
          </button>
          {children}
        </form>
      </div>
    </div>
  );
}

export default DataAccessForm;
