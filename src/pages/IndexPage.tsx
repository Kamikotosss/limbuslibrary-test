import React from "react";
import { MainInfo } from "../components/main-info/MainInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const IndexPage:React.FC = () => {
    return  <CommonPageLayout>
        <LoadingPageWrapper queryKeys={["ego","identities"]}>
            <MainInfo/>
        </LoadingPageWrapper>
</CommonPageLayout> 
}
