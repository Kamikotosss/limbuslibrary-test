import { OfficialLinks } from "../official-links/OfficialLinks"
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
    <h2>Ссылки на официальные источники</h2>
    <OfficialLinks/>
    </section>
}