import React from 'react';
import './aside-nav.scss';

const AsideNav = () => {

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
        },
        {
            id:'b3',
            image:'Sign out.svg',
            text:'Sign out'
        }
    ]
    return (
        <aside className="aside-nav">
            <div className="aside-nav__logo">
                <img src="/assets/TrueCare24_logo.svg"/>
            </div>

            { links.map( ({id,image,text}) =>  
                <div key={id} className="aside-nav__link">
                    <img src={`/assets/${image}`}/><br/>
                    {text}
                </div>
            )}
        </aside>
    )
}

export default AsideNav;
