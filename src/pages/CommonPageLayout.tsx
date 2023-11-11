import React, { ReactNode, useEffect } from "react";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { MainLayoutContainer } from "../components/main-layout-container/MainLayoutContainer";
import { MobileInfoModal } from "../components/mobile-info-modal/MobileInfoModal";
import { ScrollUpButton } from "../components/scroll-up-button/ScrollUpButton";
import { TopMenu } from "../components/top-menu/TopMenu";


export const CommonPageLayout:React.FC<{children:ReactNode|ReactNode[],title:string}> = ({children,title}) => {
    useEffect(() => {
        document.title = title;
    }, []);
    return  <>
        <TopMenu/>
        <LeftMenu/>
        <DisclaimerBanner/>
        <ScrollUpButton/>
        <MobileInfoModal/>
        <MainLayoutContainer>
            {children}
        </MainLayoutContainer>
    </>
}
