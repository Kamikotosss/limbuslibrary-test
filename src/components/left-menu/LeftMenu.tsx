import React from "react";
import { Link,useLocation } from "react-router-dom";
import { EGOSVG } from "../svg/EGOSVG";
import { GLLSVG } from "../svg/GLLSVG";
import { IdentitiesSVG } from "../svg/IdentitiesSVG";
import { StatusesPageSVG } from "../svg/StatusesPageSVG";
import { TeamBuilderSVG } from "../svg/TeamBuilderSVG";
import { TierListSVG } from "../svg/TierListSVG";
import "./LeftMenu.css"
export const LeftMenu:React.FC = () => {
    const location = useLocation();
    const isCurrentLocation = (route:string)=>{
        return location.pathname.split("/")[1].includes(route);
    }
    const links = [
        {route:"tierlist" ,name:"ТИР ЛИСТ",SVG:TierListSVG},
        {route:"teambuilder" ,name:"ТИМ БИЛДЕР",SVG:TeamBuilderSVG},
        {route:"identities" ,name:"ЛИЧНОСТИ",SVG:IdentitiesSVG},
        {route:"ego" ,name:"ЭГО",SVG:EGOSVG},
        {route:"statuses" ,name:"СТАТУСЫ",SVG:StatusesPageSVG},
    ];
    return (
        //TODO routing list
        <div className={"left-menu"}>
            <nav>
                <ul>
                    <li><Link to="/"><GLLSVG/><span>GREAT <span>LIMBUS</span> LIBRARY</span></Link></li>
                    {
                        links.map(({route,name,SVG}) =>{
                            return(
                                <li key={route}><Link className={(isCurrentLocation(route) ? "left-menu-route--active":"")} to={`/${route}`}><SVG active={isCurrentLocation(route)}/>{name}</Link></li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}
