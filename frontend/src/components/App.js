import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmCardDeletePopup from './ConfirmCardDeletePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmCardDeletePopupOpen, setIsConfirmCardDeletePopupOpen] = useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [deletedCard, setDeletedCard] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getPhotoCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData);
        })
        .catch(err => {
          console.log(`Ошибка авторизации: ${err}`);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    handleCheckToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(res => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch(err => {
          console.log(`Ошибка проверки токена: ${err}`);
        });
    }
  }

  function handleRegister({ email, password }) {
    console.log(email, password);
    auth
      .register(email, password)
      .then(data => {
        console.log(data);
        navigate('/sign-in');
        setIsRegistered(true);
      })
      .catch(err => {
        setIsRegistered(false);
        console.log(`Ошибка регистрации: ${err}`);
      })
      .finally(() => {
        setIsInfoToolTipPopupOpen(true);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .login(email, password)
      .then(data => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          setEmail(email);
          navigate('/');
        }
      })
      .catch(err => {
        console.log(`Ошибка входа: ${err}`);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/sign-in');
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => {
        console.log(`При постановке или удалении лайка возникла ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card)
      .then(() => {
        setCards(cards => cards.filter(c => c._id !== card._id));
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При удалении карточки возникла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При редактировании профиля возникла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .setUserAvatar(data)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При изменении аватара возникла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardAdd(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(`При добавлении карточки возникла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmCardDeletePopupOpen(false);
    setIsInfoToolTipPopupOpen(false);
    setSelectedCard({});
    setDeletedCard({});
  }

  return (
    <div className="App">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header email={email} isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/sign-up"
              element={<Register isLoading={isLoading} handleRegister={handleRegister} />}
            />
            <Route
              path="/sign-in"
              element={<Login isLoading={isLoading} handleLogin={handleLogin} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  cards={cards}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onConfirmDelete={setIsConfirmCardDeletePopupOpen}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={setDeletedCard}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="*"
              element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" replace />}
            />
          </Routes>
          {isLoggedIn && <Footer />}

          {/* Поп-ап редактирования профиля */}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          {/* Поп-ап добавления карточки */}
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleCardAdd}
            isLoading={isLoading}
          />

          {/* Просмотр карточки */}
          <ImagePopup onClose={closeAllPopups} card={selectedCard} name="card" />

          {/* Поп-ап удаления карточки */}
          <ConfirmCardDeletePopup
            isOpen={isConfirmCardDeletePopupOpen}
            onClose={closeAllPopups}
            onCardDelete={handleCardDelete}
            card={deletedCard}
            isLoading={isLoading}
          />

          {/* Поп-ап редактирования аватарки */}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          {/* Поп-ап-статус уведомление о регистрации */}
          <InfoTooltip
            isOpen={isInfoToolTipPopupOpen}
            onClose={closeAllPopups}
            isRegistered={isRegistered}
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
