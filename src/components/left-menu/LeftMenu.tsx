import React from "react";
import { Link } from "react-router-dom";
import "./LeftMenu.css"
export const LeftMenu:React.FC = () => {
    
    return (
        //TODO routing list
        <div className={"left-menu"}>
            <nav>
                <ul>
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/tierlist">Тир лист</Link></li>
                    <li><Link to="/teambuilder">Тим билдер</Link></li>
                    <li><Link to="/identities">Личности</Link></li>
                    <li><Link to="/ego">ЭГО</Link></li>
                </ul>
            </nav>
        </div>
    )
}
