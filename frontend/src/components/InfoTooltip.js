import registrationSuccess from '../images/registration-is-success.png';
import registrationFailed from '../images/registration-is-not-success.png';

function InfoTooltip({ isOpen, onClose, isRegistered }) {
  return (
    <div>
      <div className={`popup popup_type_info-tip} ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button
            aria-label="Закрыть"
            type="button"
            className="button popup__close-button"
            onClick={onClose}
          ></button>
          {isRegistered ? (
            <div>
              <img
                className="popup__info-tip-image"
                src={registrationSuccess}
                alt="Успешная регистрации"
              />
              <p className="popup__info-tip-title">Вы успешно зарегистрировались!</p>
            </div>
          ) : (
            <div>
              <img
                className="popup__info-tip-image"
                src={registrationFailed}
                alt="Ошибка регистрации"
              />
              <p className="popup__info-tip-title">Что-то пошло не так! Попробуйте еще раз.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
