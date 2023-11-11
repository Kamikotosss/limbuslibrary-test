import React from "react";
import { EntityFullInfo } from "../components/entity-full-info/EntityFullInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const IdentityPage:React.FC = () => {
   
    return <CommonPageLayout title="Список Личностей">
            <LoadingPageWrapper queryKeys={["identities","statuses"]}>
                <EntityFullInfo/>
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
