import React from "react";
import { AboutGameInfo } from "../components/about-game-info/AboutGameInfo";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { LeftMenu } from "../components/left-menu/LeftMenu";

export const AboutGamePage:React.FC = () => {
    
    return  <>
        <LeftMenu/>
        <DisclaimerBanner/>
        <main className={"global-content-wrapper"}>
            <AboutGameInfo/>
        </main>
    </>
}
