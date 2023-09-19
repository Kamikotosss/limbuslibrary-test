import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getLocationLastParam } from "../../tools/getLocationLastParam";
import "./TierListNav.css";

export const TierListNav:React.FC = () => {
    const location = useLocation();
    const routes = [
        {
            path:"identities",
            name:"Личности"
        },
        {
            path:"ego",
            name:"ЭГО"
        },
        {
            path:"passives",
            name:"Пассивки"
        }
    ];
    return (
        <div className={"tier-list-nav-container"}>
            <nav className={"tier-list-nav"}>
                <ul>
                    {
                        routes.map((route)=>{
                            return(
                                <li key={`${route.path}`}>
                                    <Link className={getLocationLastParam(location.pathname)=== route.path ? "tier-list-nav--active" : ""} to={`/tierlist/${route.path}`}>
                                        {route.name}
                                    </Link>
                                    {getLocationLastParam(location.pathname)=== route.path && <div className="tier-list-nav-line"/>}
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}
