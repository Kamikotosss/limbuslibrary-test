import React, { useRef } from "react"
import { Link } from "react-router-dom"
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver"
import { AppleStoreSVG } from "../svg/AppleStoreSVG"
import { GlobalSVG } from "../svg/GlobalSVG"
import { GooglePlaySVG } from "../svg/GooglePlaySVG"
import { RedditSVG } from "../svg/RedditSVG"
import { SteamSVG } from "../svg/SteamSVG"
import { TwitterSVG } from "../svg/TwitterSVG"
import "./OfficialLinks.css"

export const OfficialLinks:React.FC = () => {
    const LinkElement:React.FC<{link:string,SVG:React.FC}> = ({link,SVG}) => { 
        const containerRef = useRef(null);
        const {isVisible} = useIntersectionObserver(containerRef,0.1);
        return <Link ref={containerRef} className={`${isVisible && "official-links--animated"}`} to={link} target="_blank">
            <SVG/>
        </Link>
    }
    const links = [
        { link: "https://limbuscompany.com/", svg: GlobalSVG },
        { link: "https://play.google.com/store/apps/details?id=com.ProjectMoon.LimbusCompany&pli=1", svg: GooglePlaySVG },
        { link: "https://store.steampowered.com/app/1973530/Limbus_Company/", svg: SteamSVG },
        { link: "https://apps.apple.com/us/app/limbus-company/id6444112366", svg: AppleStoreSVG },
        { link: "https://twitter.com/LimbusCompany_B", svg: TwitterSVG },
        { link: "https://www.reddit.com/r/limbuscompany/", svg: RedditSVG },
      ];
      
    return <section className={`official-links`}>
        {links.map((link,index)=>{
            return <LinkElement key={index} link={link.link} SVG={link.svg}/>
        })}
</section>
}