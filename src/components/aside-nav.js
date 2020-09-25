import React , {useContext} from 'react';
import './aside-nav.scss';
import {MyContext} from '../App'

const AsideNav = () => {
    const {isAuth, setIsAuth} = useContext(MyContext)

    const links = [
        {
            id:'b1',
            image:'Dashboard.svg',
            text:'Dashboard'
        },
        {
            id:'b2',
            image:'FAQ.svg',
            text:'FAQ'
        }
    ]
    return (
        <aside className="aside-nav sm-hide">
            <div className="aside-nav__logo">
                <img src="/assets/TrueCare24_logo.svg"/>
            </div>

            {links.map( ({id,image,text}) =>  
                <div key={id} className="aside-nav__link">
                    <img src={`/assets/${image}`}/><br/>
                    {text}
                </div>
            )}
            <div onClick={() => setIsAuth(false)} className="aside-nav__link">
                <img src={`/assets/Sign out.svg`}/><br/>
                Sign out
            </div>
        </aside>
    )
}

export default AsideNav;
