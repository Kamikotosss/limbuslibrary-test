import React from "react";
import "./TbList.css";
interface TbListInterface{
    children: React.ReactNode;
    header:string;
}
export const TbList:React.FC<TbListInterface> = ({children,header}) => {
    return (
        <div  className={"tb-list-container"} >
            <span className={"tb-list-header"} >{header} List</span>
            <div  className={"tb-list-content"} >
                {children}
            </div>
        </div>
    )
}