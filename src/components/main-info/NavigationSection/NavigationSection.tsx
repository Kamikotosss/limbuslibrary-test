import { useRef } from "react"
import { Link } from "react-router-dom"
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver"
import { ArrowsRightNavigateSVG } from "../../svg/ArrowsRightNavigate"
import "./NavigationSection.css"
export const NavigationSection: React.FC = () => {
    const quickStartLinks = [
        {
            text:"Для сбора команды",
            to:"/teambuilder"
        },
        {
            text:"Список с фильтрами всех личностей",
            to:"/identities"
        },
        {
            text:"Список с фильтрами всех ЭГО",
            to:"/ego"
        },
        {
            text:"Информация о баффах, дебаффах и прочих статусах , которые есть в игре ",
            to:"/statuses"
        },
        {
            text:"Тирлисты Личностей , ЭГО и Пассивок ",
            to:"/tierlist/identities"
        },
    ]
    const NavLink:React.FC<{to:string,text:string}> = ({to,text}) =>{
        const containerRef = useRef(null);
        const {isVisible} = useIntersectionObserver(containerRef,0.1)
        return <Link to={to} ref={containerRef} className={`nav-link ${isVisible && "nav-link--animated"}`}>
        <li>
            {text}
            <ArrowsRightNavigateSVG />
        </li>
    </Link>
    }
    return <section className="navigation-section">
        <h2> Быстрая навигация по сайту </h2>
        <ul>
            {quickStartLinks.map((link, index) => {
                return <NavLink key={index} to={link.to} text={link.text}/>
            })}
        </ul>
    </section>
}