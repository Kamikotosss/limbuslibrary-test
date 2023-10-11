import { DiscordIconSVG } from "../svg/DiscordIcon"
import { ExcelIconSVG } from "../svg/ExcelIcon"
import { GitHubIconSVG } from "../svg/GitHub"
import "./ContactInfo.css"
export const ContactInfo:React.FC = () =>{
    return <section className="contact-info">
    <h1> Наши контакты</h1>

    <article>
        <h2> Автор оригинала </h2>
        <button>
            <DiscordIconSVG/>
        </button>
        <button>
            <ExcelIconSVG/>
        </button>
    </article>

    <article>
        <h2> Создатель сайта </h2>
        <button>
            <DiscordIconSVG/>
        </button>
        <button>
            <GitHubIconSVG/>
        </button>
    </article>
        
    </section>
}