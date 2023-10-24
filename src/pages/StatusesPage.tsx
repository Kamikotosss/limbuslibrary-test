import React from "react";
import { StatusesTable } from "../components/statuses-table/StatusesTable";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const StatusesPage:React.FC = () => {
    return <CommonPageLayout>
        <LoadingPageWrapper queryKeys={["statuses"]}>
            <h1 style={{width:"90%" ,color:"white"}}>Список статусов</h1>
            <StatusesTable/>
        </LoadingPageWrapper>
    </CommonPageLayout> 
}
