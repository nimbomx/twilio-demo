import React, {useContext} from 'react';
import {MyContext} from '../App'
import './header.scss';

const Header = () => {
    const {isAuth, user} = useContext(MyContext)
    return (
        <header className="header">
            <button className="header__button uppercase bold"><img src="/assets/Back 1.svg"/> Back</button>
            <div>
                <input placeholder="Go to case ID#" />
                <button><img src="/assets/Go.svg"/></button>
            </div>
            <button className="header__button "><img src="/assets/Fulfillment KPIs.svg"/> Fulfillment KPIs</button> 

            {isAuth && user && <button >{user.email}<img src="/assets/Dropdown.svg"/></button> }
        </header>
    )
}

export default Header;
