import React from 'react';
import "./header.css";

function Header({ name }) {
    return (
        <div className="header">
            <div className="header__title">
                TASK MANAGER
            </div>
            <div className="header__name">
                <h1 >HELLO :<span> {name?.toUpperCase()}</span></h1>
            </div>
        </div>
    )
}

export default Header
