import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav
        role='navigation'
        aria-label='Main menu'
        itemScope
        itemType='https://schema.org/SiteNavigationElement'
    >
        <div className="menu">
            <ul>
                <li><Link itemProp='url' to={'/'}>Homepage</Link></li>
                <li><Link to={'/about'}>About</Link></li>
                <li><Link to={'/login'}>Login</Link></li>
            </ul>
        </div>
    </nav>
  );
}

export default Menu;