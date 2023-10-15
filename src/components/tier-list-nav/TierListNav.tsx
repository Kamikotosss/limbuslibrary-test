import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./TierListNav.css";

export const TierListNav:React.FC = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
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
                                    <Link className={type === route.path ? "tier-list-nav--active" : ""} to={`/limbuslibrary/tierlist?type=${route.path}`}>
                                        {route.name}
                                    </Link>
                                    {type === route.path && <div className="tier-list-nav-line"/>}
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}
