import React from "react";
import { ContactInfo } from "../components/contact-info/ContactInfo";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { MainLayoutContainer } from "../components/main-layout-container/MainLayoutContainer";

export const ContactPage:React.FC = () => {
    
    return  <>
        <LeftMenu/>
        <DisclaimerBanner/>
        <MainLayoutContainer>
            <ContactInfo/>
        </MainLayoutContainer>
    </>
}
