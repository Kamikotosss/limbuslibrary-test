import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { DiscordIconSVG } from "../svg/DiscordIcon"
import { ExcelIconSVG } from "../svg/ExcelIcon"
import { GitHubIconSVG } from "../svg/GitHub"
import "./ContactInfo.css"
export const ContactInfo:React.FC = () =>{
    const [tooltip, setTooltip] = useState([{
        id:1,
        link:"ritsy.",
        triggered:false,
    },{
        id:2,
        link:"kamikotosss",
        triggered:false,
    }]);
    const [timer , setTimer] = useState<NodeJS.Timeout|null>(null);
    const copyTextToClipboard = (id:number) =>{
        const textArea = document.createElement('textarea');
        const ds = tooltip.find(t => t.id === id);
        if(!ds) return;
        textArea.value = ds.link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    useEffect(() => {
        if(timer) clearTimeout(timer);
        const timeout = setTimeout(() => {
            setTooltip(prevTooltip => prevTooltip.map(t => ({ ...t, triggered: false })));
        }, 1000); 
        setTimer(timeout)
        return () => {
            if(timer) clearTimeout(timer);
        }
    }, [tooltip]);
    return <section className="contact-info">
    <h1> Наши контакты</h1>
    <article>
        <h2> Автор оригинала </h2>
        <button className="discord" onClick={()=>{
            const targetID = 1;
            copyTextToClipboard(targetID);
            setTooltip(prevTooltip => prevTooltip.map(t => t.id === targetID ? { ...t, triggered: true } : t));
        }}>
            <div className={`contact-tooltip ${tooltip.find(t => t.id === 1)?.triggered && "contact-tooltip--active"}`}> Никнейм скопирован </div>
            <DiscordIconSVG/>
        </button>
        <button>
        <Link to="https://docs.google.com/spreadsheets/d/18pJE1GyNezWQQIvC06iCNtrdV3oTvsSgjYIAwqKBed4/edit?pli=1#gid=0" target="_blank">
            <ExcelIconSVG/>
        </Link>
        </button>
    </article>

    <article>
        <h2> Создатель сайта </h2>
        <button className="discord" onClick={()=>{
            const targetID = 2;
            copyTextToClipboard(targetID);
            setTooltip(prevTooltip => prevTooltip.map(t => t.id === targetID ? { ...t, triggered: true } : t));
        }}>
            <div className={`contact-tooltip ${tooltip.find(t => t.id === 2)?.triggered && "contact-tooltip--active"}`} > Никнейм скопирован </div>
            <DiscordIconSVG/>
        </button>
        <button>
        <Link to="https://github.com/Kamikotosss" target="_blank">
            <GitHubIconSVG/>
        </Link>
        </button>
    </article>
        
    </section>
}