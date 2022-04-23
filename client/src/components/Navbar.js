import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {

    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        event.preventDefault();
        auth.logout();
    }

    return (
        <nav className="blue darken-1">
            <div className="container">
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">Короткая ссылка</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><Link to='/create'>Создать</Link></li>
                        <li><Link to='/links'>Линки</Link></li>
                        <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}