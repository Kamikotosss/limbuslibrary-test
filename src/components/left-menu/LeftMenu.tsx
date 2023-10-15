import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link,useLocation } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { leftMenuChangeLayoutAction } from "../../store/reducers/left-menu-reducer";
import { ContactSVG } from "../svg/ContactSVG";
import { EGOSVG } from "../svg/EGOSVG";
import { GLLSVG } from "../svg/GLLSVG";
import { IdentitiesSVG } from "../svg/IdentitiesSVG";
import { InfoSvg } from "../svg/InfoSVG";
import { StatusesPageSVG } from "../svg/StatusesPageSVG";
import { TeamBuilderSVG } from "../svg/TeamBuilderSVG";
import { TierListSVG } from "../svg/TierListSVG";
import "./LeftMenu.css"
export const LeftMenu:React.FC = () => {
    const location = useLocation();
    const leftMenuState = useTypedSelector(store => store.leftMenuReducer);
    const dispatch = useDispatch();
    const isCurrentLocation = (route:string)=>{
        return location.pathname.split("/")[2].includes(route);
    }
    
    const links = [
        {to:"/limbuslibrary/tierlist?type=identities",route:"tierlist" ,name:"ТИР ЛИСТ",SVG:TierListSVG},
        {to:"/limbuslibrary/teambuilder",route:"teambuilder" ,name:"ТИМ БИЛДЕР",SVG:TeamBuilderSVG},
        {to:"/limbuslibrary/identities",route:"identities" ,name:"ЛИЧНОСТИ",SVG:IdentitiesSVG},
        {to:"/limbuslibrary/ego",route:"ego" ,name:"ЭГО",SVG:EGOSVG},
        {to:"/limbuslibrary/statuses",route:"statuses" ,name:"СТАТУСЫ",SVG:StatusesPageSVG},
        {to:"/limbuslibrary/aboutgame",route:"aboutgame" ,name:"ОБ ИГРЕ",SVG:InfoSvg},
        {to:"/limbuslibrary/contact",route:"contact" ,name:"НАШИ КОНТАКТЫ",SVG:ContactSVG},
    ];
    return (
        //TODO routing list
        <div className={`left-menu ${leftMenuState ? "left-menu--minimized" : "left-menu--maximized"} `}>
            <nav>
                <ul>
                <div className="burger-menu--wrapper">
                    <button onClick={()=>leftMenuChangeLayoutAction(dispatch)} className="burger-menu"><div className="line1"/><div className="line2"/><div className="line3"/></button>
                </div>
                <li><Link to="/limbuslibrary/">{ !leftMenuState ? <><GLLSVG/> <span>GREAT <span>LIMBUS</span> LIBRARY</span></> : <span>G<span>L</span>L</span>}</Link></li>
                    {
                        links.map(({route,name,to,SVG}) =>{
                            return(
                                <li key={route}><Link className={(isCurrentLocation(route) ? "left-menu-route--active":"")} to={to}><SVG active={isCurrentLocation(route)}/>{!leftMenuState && name}</Link></li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}
