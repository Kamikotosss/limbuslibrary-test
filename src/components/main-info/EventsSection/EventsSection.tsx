import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import "./EventsSection.css"
export const EventsSection: React.FC = () => {
    const events = [ 
        {
            startDate:new Date('October 26, 2023 12:00:00 GMT+09:00'),
            endDate:new Date('November 09, 2023 9:59:59 GMT+09:00'),
            name:"",
            imgSrc:"./images/eventH.png"
        },
        {
            startDate:new Date('November 16, 2023 12:00:00 GMT+09:00'),
            endDate:new Date('March 29, 2024 03:59:59 GMT+09:00'),
            name:"",
            imgSrc:"./images/bps3.png"
        },
        {
            startDate:new Date('October 10, 2023 12:00:00 GMT+09:00'),
            endDate:new Date('November 15, 2023 12:00:00 GMT+09:00'),
            name:"",
            imgSrc:"./images/bps2.png"
        },
       
    ]
    const EventSector:React.FC<{event:{startDate:Date ,endDate:Date,name:string,imgSrc:string}}> = ({event}) =>{
    const [date,setDate] = useState<null|Date>(null);
    const containerRef = useRef(null);
    const {isVisible} = useIntersectionObserver(containerRef,0.1);
    const displayDateAndTimezone = () =>{
        const currentDate = new Date();
        setDate(currentDate)
    }
    const handleTimeDifference = (startDate:Date ,endDate:Date) =>{
        const currentDate = new Date();
        let difference = startDate.getTime() - currentDate.getTime();
        let info = "Ивент начнется через: ";
        if(difference <= 0){
            difference = endDate.getTime() - currentDate.getTime();
            info = "Ивент закончится через: ";
        }
        const millisecondsInOneDay = 86_400_000;
        const deltaDays = difference/millisecondsInOneDay;
        const deltaHours = deltaDays%1*24;
        const deltaMinutes = deltaHours%1*60;
        const deltaSeconds = deltaMinutes%1*60;
        if (difference < 0) return <span> Событие недавно завершилось</span>
        return <span>
            {info} <br></br> {`${Math.trunc(deltaDays)} д. ${Math.trunc(deltaHours)} ч. ${Math.trunc(deltaMinutes)} м. ${Math.trunc(deltaSeconds)} c.`} 
        </span>
    }

    useEffect(()=>{
        const timeInterval = setInterval(displayDateAndTimezone, 1000);
        return () => {
            clearInterval(timeInterval);
        }
    },[]);
    return <article ref={containerRef} className={`event-sector ${isVisible && "event-sector--animated"}`}>
        {handleTimeDifference(event.startDate, event.endDate)}
        <img src={event.imgSrc} alt={event.name} />
    </article>
    }
    return <section className="events-section">
        <h2> Активные события </h2>
        {events.map((event, index) => {
            return <EventSector  key={index} event={event}/>
        })}
    </section>
}