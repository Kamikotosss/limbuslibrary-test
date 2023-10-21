import React, {useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link,useLocation } from "react-router-dom";
import { mobileLayoutFrom } from "../../constants/mobileLayoutFrom";
import { useTouchSwipe } from "../../hooks/useTouchSwipe";
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
    const isMenuExpanded = useTypedSelector(store => store.leftMenuReducer);
    const dispatch = useDispatch();
    const touch = useTouchSwipe(50);
    const isCurrentLocation = (route:string)=>{
        return location.pathname.split("/")[1].includes(route);
    }
    
    const links = [
        {to:"/tierlist?type=identities",route:"tierlist" ,name:"ТИР ЛИСТ",SVG:TierListSVG},
        {to:"/teambuilder",route:"teambuilder" ,name:"ТИМ БИЛДЕР",SVG:TeamBuilderSVG},
        {to:"/identities",route:"identities" ,name:"ЛИЧНОСТИ",SVG:IdentitiesSVG},
        {to:"/ego",route:"ego" ,name:"ЭГО",SVG:EGOSVG},
        {to:"/statuses",route:"statuses" ,name:"СТАТУСЫ",SVG:StatusesPageSVG},
        {to:"/aboutgame",route:"aboutgame" ,name:"ОБ ИГРЕ",SVG:InfoSvg},
        {to:"/contact",route:"contact" ,name:"НАШИ КОНТАКТЫ",SVG:ContactSVG},
    ];
    
    const [hasRendered, setHasRendered] = useState(false);

    useEffect(() => {
        setHasRendered(true); 
    }, []);

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const {isStarted,offsetX,isThresholdMetExpand,isThresholdMetHide,isSwipe} =touch;
        if (ref.current && isSwipe) {
            if(isThresholdMetExpand){
                ref.current.style.transform = `translateX(0)`;
                leftMenuChangeLayoutAction(dispatch,false);
            }
            else if(isThresholdMetHide){
                ref.current.style.transform = `translateX(-100%)`;
                leftMenuChangeLayoutAction(dispatch,true);
            }
            // else if(isStarted){
            //     console.log("is started offset !")
            //     ref.current.style.transform = `translateX(calc(-100% + ${offsetX*5}px))`;
            // }
            // else {
            //     ref.current.style.transform = `translateX(-100%)`;
            // }
        } 
    }, [touch]);
    return (
        <div ref={ref} 
            className={`left-menu ${hasRendered ? '' : 'first-render'} ${isMenuExpanded ? "left-menu--minimized" : "left-menu--maximized"} `}
            style={
                {
                    transform: (isMenuExpanded && window.innerWidth <= mobileLayoutFrom) ? `translateX(-100%)`: `translateX(0)`
                }
            }
        >
            <nav>
                <ul>
                <div className="burger-menu--wrapper">
                    <button onClick={()=>leftMenuChangeLayoutAction(dispatch,!isMenuExpanded)} className="burger-menu"><div className="line1"/><div className="line2"/><div className="line3"/></button>
                </div>
                <li><Link to="/">{ !isMenuExpanded ? <><GLLSVG/> <span>GREAT <span>LIMBUS</span> LIBRARY</span></> : <span>G<span>L</span>L</span>}</Link></li>
                    {
                        links.map(({route,name,to,SVG}) =>{
                            const isCurrentRouteLocation = isCurrentLocation(route);
                             return(
                                <li key={route}>
                                    <Link 
                                    onClick={(e) => {
                                        if (isCurrentRouteLocation || touch.isStarted) e.preventDefault(); 
                                        // if (isCurrentRouteLocation ) e.preventDefault(); 
                                    }} 
                                    className={(isCurrentRouteLocation ? "left-menu-route--active":"")} 
                                    to={to}>
                                        <SVG active={isCurrentRouteLocation}/>
                                        {name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>

    )
}
