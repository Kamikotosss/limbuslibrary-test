import { Link } from "react-router-dom"
import { AppleStoreSVG } from "../svg/AppleStoreSVG"
import { GlobalSVG } from "../svg/GlobalSVG"
import { GooglePlaySVG } from "../svg/GooglePlaySVG"
import { RedditSVG } from "../svg/RedditSVG"
import { SteamSVG } from "../svg/SteamSVG"
import { TwitterSVG } from "../svg/TwitterSVG"
import "./AboutGameInfo.css"
export const AboutGameInfo:React.FC = () =>{
    return <section className="about-game-info">
    <h1>Об игре</h1>
    <p>
    <span>Limbus Company</span> - это инди игра в жанре хоррор с элементами ролевого прохождения для операционной системы Microsoft Windows и мобильных устройств, работающих под управлением iOS или Android,
    разработанная и изданная южнокорейской студией <span>Project Moon</span>.Игра была выпущена по всему миру 26 февраля 2023 года. 
    События игры происходят в дистопическом, гиперкапиталистическом мире, известном только как "Город", где разворачиваются все другие работы Project Moon, включая Lobotomy Corporation, Library of Ruina и веб-комикс с названием Leviathan, но действие игры происходит некоторое время после событий всех этих историй.

    В игре есть элементы гача, что позволяет тратить реальные деньги на приобретение Lunacy (внутриигровой валюты)
    или билетов, которые используются для приобретения новых Сущностей Грешников или E.G.O, кроме базовых, предоставленных игроку в начале.
    </p>
    <img src="./images/limbus.png"/>
    <h2>Ссылки на официальные источники</h2>
    <article>
        <Link to={"https://limbuscompany.com/"} target="_blank" ><GlobalSVG/></Link>
        <Link to={"https://play.google.com/store/apps/details?id=com.ProjectMoon.LimbusCompany&pli=1"} target="_blank" ><GooglePlaySVG/></Link>
        <Link to={"https://store.steampowered.com/app/1973530/Limbus_Company/"} target="_blank" ><SteamSVG/></Link>
        <Link to={"https://apps.apple.com/us/app/limbus-company/id6444112366"} target="_blank" ><AppleStoreSVG/></Link>
        <Link to={"https://twitter.com/LimbusCompany_B"} target="_blank" ><TwitterSVG/></Link>
        <Link to={"https://www.reddit.com/r/limbuscompany/"} target="_blank" ><RedditSVG/></Link>
        
    </article>
    </section>
}