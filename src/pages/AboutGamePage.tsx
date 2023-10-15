import React from "react";
import { AboutGameInfo } from "../components/about-game-info/AboutGameInfo";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { MainLayoutContainer } from "../components/main-layout-container/MainLayoutContainer";

export const AboutGamePage:React.FC = () => {
    
    return  <>
        <LeftMenu/>
        <DisclaimerBanner/>
        <MainLayoutContainer>
            <AboutGameInfo/>
        </MainLayoutContainer>
    </>
}
