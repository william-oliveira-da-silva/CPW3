import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {

    render() {
        return (
            <div>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/materiais">Materiais</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/itens">Itens</Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Menu;