import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { ItemIdentity } from "../item-identity/ItemIdentity";
import "./ListIds.css";

export const ListIds:React.FC = () => {
    const {ids} = useTypedSelector(state => state.idsReducer);
    const filterState = useTypedSelector(state => state.filterReducer);
    return (
        <div className={"list-ids"} >
                {ids?.map((item:IdentityInterface)=>{
                if (isFilterMatching(filterState,item))
                return (<ItemIdentity identity={item} key={item.imgUrl}></ItemIdentity>);
                })}
        </div>
    )
}