import React from 'react'
import './Navbar.scss';
const Navbar = () => {
  return (
    <header className="header" id="header">
        <nav className="nav container">
            <a href="#home" className="nav_logo">LineUp</a>
            <div className="nav_menu" id="nav-menu">
                <ul className="nav_list grid">
                    <li className="nav_item">
                        <a href="#home" className="nav_link">
                            Home
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="#home" className="nav_link">
                            Status
                        </a>
                    </li>
                    <li className="nav_item">
                        <a href="#sm" className="nav_link">
                            
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
  )
}

export default Navbar