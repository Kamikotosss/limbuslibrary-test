import React from "react";
import { Filters } from "../components/filters/Filters";
import { ListEgo } from "../components/list-ego/ListEgo";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const EGOPage:React.FC = () => {
    return <CommonPageLayout>
        <LoadingPageWrapper queryKeys={["ego"]}>
            <h1 style={{width:"90%" ,color:"white"}}>Список ЭГО</h1>
            <Filters/>
            <ListEgo/>
        </LoadingPageWrapper>
    </CommonPageLayout> 
}
