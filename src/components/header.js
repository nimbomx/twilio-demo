import React from 'react';
import './header.scss';

const Header = () => {

    return (
        <header className="header">
            <button className="header__button uppercase bold"><img src="/assets/Back 1.svg"/> Back</button>
            <div>
                <input placeholder="Go to case ID#" />
                <button><img src="/assets/Go.svg"/></button>
            </div>
            <button className="header__button "><img src="/assets/Fulfillment KPIs.svg"/> Fulfillment KPIs</button> 

            <button >[user]<img src="/assets/Dropdown.svg"/></button> 
        </header>
    )
}

export default Header;
