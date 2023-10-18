import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Filters } from "../filters/Filters";
import { TbListEGO } from "../tb-list-ego/TbListEgo";
import { TbListIds } from "../tb-list-ids/TbListIds";
import "./TbList.css";

export const TbList:React.FC = () => {
    return (
        <div  className={"tb-list-container"} >
            <Filters></Filters>
            <TbListIds></TbListIds>
            <TbListEGO></TbListEGO>
        </div>
    )
}