import React from "react";
import { Link } from "react-router-dom";
import "./LeftMenu.css"
export const LeftMenu:React.FC = () => {
    
    return (
        //TODO routing list
        <div className={"left-menu"}>
            <nav>
                <ul>
                    <Link to="/"><li className={"left-menu-title"}>GREAT<br/>LIMBUS<br/>LIBRARY</li></Link>
                    <Link to="/tierlist"><li>Тир лист</li></Link>
                    <Link to="/teambuilder"><li>Тим билдер</li></Link>
                    <Link to="/identities"><li>Личности</li></Link>
                    <Link to="/ego"><li>ЭГО</li></Link>
                </ul>
            </nav>
        </div>
    )
}
