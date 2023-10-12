import React from "react";
import { EntitySection } from "./EntitySection/EntitySection";
import { EventsSection } from "./EventsSection/EventsSection";
import "./MainInfo.css";
import { NavigationSection } from "./NavigationSection/NavigationSection";
import { ToDoSection } from "./ToDoSection/ToDoSection";
export const MainInfo:React.FC = () => {


    return (
        <section className="main-info" >
            <section className="main-info-left">
                <header className="main-info-header-main">
                    <h1> Great <span>Limbus</span> Library </h1>
                    <p>
                    Great Limbus Library- это фан-сайт и база данных, разработанные сообществом, 
                    посвященные игре Limbus Company.
                    </p>
                </header>
                <EntitySection/>
                <NavigationSection/>
                <ToDoSection/>
            </section>
               
            <section className="main-info-right">
                    <EventsSection/>
            </section>
               
        </section>
    )
}