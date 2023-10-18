import React from "react";
import { ContactInfo } from "../components/contact-info/ContactInfo";
import { CommonPageLayout } from "./CommonPageLayout";

export const ContactPage:React.FC = () => {
    return <CommonPageLayout>
            <ContactInfo/>
    </CommonPageLayout>
}
