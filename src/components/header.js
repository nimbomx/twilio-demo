import React, {useContext} from 'react';
import {MyContext} from '../App'
import './header.scss';
import Config from './config';

const Header = () => {
    const {user,showConfig,setShowConfig} = useContext(MyContext)
    return (
        <>
        <header className="header d-flex space-beteeen">
            <div className="">
                <button className="header__button uppercase bold"><img src="/assets/Back 1.svg"/> Back</button>
                <div className="group-input md-hide">
                    <input placeholder="Go to case ID#" />
                    <button><img src="/assets/Go.svg"/></button>
                </div>
                <button className="header__button sm-hide"><img src="/assets/Fulfillment KPIs.svg"/> Fulfillment KPIs</button> 
            </div>
            <div>
                {user && <button className="dropdown" onClick={()=>setShowConfig(true)} >{user.email}<img src="/assets/Dropdown.svg"/></button> }
            </div>  
        </header>
        {showConfig && <Config />}
        </>
    )
}

export default Header;
