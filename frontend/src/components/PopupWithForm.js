import React from 'react';

function PopupWithForm({ title, name, children, buttonText, isOpen, onClose, onSubmit }) {
  return (
    <div>
      <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button
            aria-label="Закрыть"
            type="button"
            className="button popup__close-button"
            onClick={onClose}
          ></button>
          <h2 className="popup__title">{title}</h2>
          <form
            className={`popup__input-form popup__input-form_type_${name}`}
            name={name}
            onSubmit={onSubmit}
          >
            {children}
            <button aria-label="Сохранить" type="submit" className="button popup__save-button">
              {buttonText || 'Сохранить'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
