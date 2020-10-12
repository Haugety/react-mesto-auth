import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import api from '../utils/api';
import auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import CardDeletePopup from './CardDeletePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipType, setInfoTooltipType] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({
    link: '',
    name: ''
  });
  const [deletedCard, setDeletedCard] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({
    id: '',
    email: ''
  });

  let history = useHistory();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((data) => {
        setCurrentUser(data[0]);
        setCards(data[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    function closeByOverlay(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    }

    document.addEventListener('click', closeByOverlay);
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', closeByOverlay);
    }
  }, []);

  const tockenCheck = React.useCallback(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setUserData({
              id: res.data._id,
              email: res.data.email
            });
            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem('jwt');
          setInfoTooltipType(false);
          setIsInfoTooltipOpen(true);
          history.push('/signin');
        });
    }
  }, [history, loggedIn]);

  React.useEffect(() => {
    tockenCheck();
  }, [tockenCheck]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardDeleteClick() {
    setIsCardDeletePopupOpen(true);
  }

  function handleCardClick(selectedCard) {
    setIsImagePopupOpen(true);
    setSelectedCard({
      link: selectedCard.link,
      name: selectedCard.name
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsCardDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsLoading(false);
  }

  function handleRegister(data) {
    auth.register(data)
      .then((res) => {
        setInfoTooltipType(true);
        setIsInfoTooltipOpen(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipType(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleAuth(data) {
    return auth.authorize(data)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipType(false);
        setIsInfoTooltipOpen(true);
        return err;
      });
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    history.push('/signin');
    setLoggedIn(false);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api.setCard(data)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleDeletedCard(card) {
    setDeletedCard(card);
    handleCardDeleteClick();
  }

  function handleDelete() {
    setIsLoading(true);
    api.removeCard(deletedCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deletedCard._id);
        setCards(newCards);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Header email={userData.email} onSignOut={handleSignOut} />

        <Switch>

          <ProtectedRoute
            path="/main"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeletedCard}
            loggedIn={loggedIn}
          />

          <Route path="/signup">
            <Register onSubmit={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login onSubmit={handleAuth} />
          </Route>

          <Route exact path="/">
            {loggedIn ? <Redirect to="/main" /> : <Redirect to="/signin" />}
          </Route>

        </Switch>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          selectedCardLink={selectedCard.link}
          selectedCardName={selectedCard.name}
          onClose={closeAllPopups}
        />

        <CardDeletePopup
          isOpen={isCardDeletePopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleDelete}
          isLoading={isLoading}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          type={infoTooltipType}
          text={
            {
              success: 'Вы успешно зарегистрировались!',
              fail: 'Что-то пошло не так! Попробуйте еще раз.'
            }
          }
        />

        <Footer />

      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;
