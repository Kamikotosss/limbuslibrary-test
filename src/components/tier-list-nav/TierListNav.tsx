import React from "react";
import { Link } from "react-router-dom";
import "./TierListNav.css";

export const TierListNav:React.FC = () => {

    return (
        <div className={"tier-list-nav-container"}>
            <nav className={"tier-list-nav"}>
                <ul>
                    <li><Link to="/tierlist/identities">Личности</Link></li>
                    <li><Link to="/tierlist/ego">ЭГО</Link></li>
                    <li><Link to="/tierlist/passives">Пассивки</Link></li>
                </ul>
            </nav>
        </div>
    )
}
