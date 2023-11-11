import React from "react";
import { MainInfo } from "../components/main-info/MainInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const IndexPage:React.FC = () => {
    return  <CommonPageLayout title="Great Limbus Library">
        <LoadingPageWrapper queryKeys={["ego","identities","statuses"]}>
            <MainInfo/>
        </LoadingPageWrapper>
</CommonPageLayout> 
}
