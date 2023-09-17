import React from "react";
import { TbListEGO } from "../tb-list-ego/TbListEgo";
import { TbListIds } from "../tb-list-ids/TbListIds";
import "./TbList.css";

export const TbList:React.FC = () => {
    return (
        <div  className={"tb-list-container"} >
            <span className={"tb-list-header"} >Identities List</span>
            <div  className={"tb-list-content"} >
                <TbListIds></TbListIds>
            </div>
            <span className={"tb-list-header"} >EGO List</span>
            <div  className={"tb-list-content"} >
                <TbListEGO></TbListEGO>
            </div>
        </div>
    )
}