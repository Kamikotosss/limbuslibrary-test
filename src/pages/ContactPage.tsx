import React from "react";
import { ContactInfo } from "../components/contact-info/ContactInfo";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { LeftMenu } from "../components/left-menu/LeftMenu";

export const ContactPage:React.FC = () => {
    
    return  <>
        <LeftMenu/>
        <DisclaimerBanner/>
        <main className={"global-content-wrapper"}>
            <ContactInfo/>
        </main>
    </>
}
