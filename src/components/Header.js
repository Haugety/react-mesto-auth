import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import { useWindowWidth } from '@react-hook/window-size';
import Logo from '../images/mesto-logo.svg';

function Header({ email, onSignOut }) {

  const windowWidth = useWindowWidth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  function handleSignOut() {
    onSignOut();
    setIsMobileMenuOpen(false);
  }

  function onMobileMenu() {
    setIsMobileMenuOpen(true);
  }

  function onMobileClose() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header className="header">
      <Route path="/main">
        { windowWidth <= 767
          ? <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu_opened' : ''}`}>
              <h2 className="header__email header__email_mobile">{email}</h2>
              <NavLink to="/signin" className="header__link header__link_mobile" onClick={handleSignOut}>Выйти</NavLink>
            </div>
          : null
        }
      </Route>
      <div className="header__main-menu">
        <img src={Logo} alt="Логотип проекта «Место Россия»" className="header__logo" />
        <Switch>
          <Route path="/signup">
            <NavLink to="/signin" className="header__link">Войти</NavLink>
          </Route>
          <Route path="/signin">
            <NavLink to="/signup" className="header__link">Регистрация</NavLink>
          </Route>
          <Route path="/main">
            { windowWidth <= 767
              ? <button
                  type="button"
                  className={`header__mobile-button ${isMobileMenuOpen ? 'header__mobile-button_close' : ''}`}
                  onClick={isMobileMenuOpen ? onMobileClose : onMobileMenu}
                >
                </button>
              : <>
                  <div className="header__info">
                    <h2 className="header__email">{email}</h2>
                    <NavLink to="/signin" className="header__link header__link_main" onClick={handleSignOut}>Выйти</NavLink>
                  </div>
                </>
            }

          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
