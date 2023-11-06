import React from "react";
import { Filters } from "../components/filters/Filters";
import { ListIds } from "../components/list-ids/ListIds";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const IdentitiesPage:React.FC = () => {
    return <CommonPageLayout>
            <LoadingPageWrapper queryKeys={["identities","statuses"]}>
                <h1 style={{width:"90%" ,color:"white"}}>Список личностей</h1>
                <Filters />
                <ListIds />
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
