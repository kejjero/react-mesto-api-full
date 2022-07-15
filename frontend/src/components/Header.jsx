import React from "react";
import logo from "../images/header__logo.svg"
import {Link, useLocation} from "react-router-dom";

function Header(props) {
    const location = useLocation();

    return (
        <header className='header'>
            <Link to={'/'} className='header__logo' src={logo} alt='Логотип'/>
            <nav className='header__wrapper'>
                {props.isLoggedIn && <p className='header__email'>{props.userEmail}</p>}
                {props.isLoggedIn
                    ? (
                        <Link to="/sign-in"
                              className="header__link header__link_logout"
                              onClick={props.handleSignOut}>
                            Выйти
                        </Link>
                    ) : (
                        location.pathname === "/sign-in"
                            ?
                            <Link to="/sign-up" className="header__link">
                                Регистрация
                            </Link>
                            :
                            <Link to="/sign-in" className="header__link">
                                Войти
                            </Link>
                    )}
            </nav>
        </header>
    )
}

export default Header;