import React from "react";
import { AboutGameInfo } from "../components/about-game-info/AboutGameInfo";
import { CommonPageLayout } from "./CommonPageLayout";

export const AboutGamePage:React.FC = () => {
    return <CommonPageLayout>
            <AboutGameInfo/>
    </CommonPageLayout> 
}
