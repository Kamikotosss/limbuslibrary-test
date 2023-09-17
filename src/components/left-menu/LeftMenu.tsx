import React from "react";
import { Link,useLocation } from "react-router-dom";
import "./LeftMenu.css"
export const LeftMenu:React.FC = () => {
    const location = useLocation();
    const isCurrentLocation = (route:string)=>{
        return location.pathname.split("/")[1].includes(route);
    }
    const links = [
        {route:"tierlist" ,name:"ТИР ЛИСТ"},
        {route:"teambuilder" ,name:"ТИМ БИЛДЕР"},
        {route:"identities" ,name:"ЛИЧНОСТИ"},
        {route:"ego" ,name:"ЭГО"},
    ];
    return (
        //TODO routing list
        <div className={"left-menu"}>
            <nav>
                <ul>
                    <li className={"left-menu-title"}><Link to="/">GREAT<br/>LIMBUS<br/>LIBRARY</Link></li>
                    {
                        links.map(({route,name}) =>{
                            return(
                                <li><Link className={(isCurrentLocation(route) ? "left-menu-route--active":"")} to={`/${route}`}>{name}</Link></li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}
