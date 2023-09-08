import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TbItem } from "../tb-item/TbItem";
export const TbListEGO:React.FC = () => {
    const egos = useTypedSelector(state => state.egoReducer).ego;
    if(!egos) return null;
    return (
        <>
            {egos?.map((entity)=>{
                return <TbItem key={`${Math.random()}`} entity={entity}></TbItem>
            })}
        </>
    )
}
