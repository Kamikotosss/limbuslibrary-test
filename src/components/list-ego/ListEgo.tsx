import React from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { ItemEGO } from "../item-ego/ItemEGO";
import "./ListEgo.css";

export const ListEgo:React.FC = () => {
    const {ego} = useTypedSelector(state => state.egoReducer);
    const filterState = useTypedSelector(state => state.filterReducer);
    return (
        <div className={"list-ego"} >
            {
                ego?.map((item:EGOInterface)=>{
                    if (isFilterMatching(filterState,item))
                    return (<ItemEGO ego={item} key={item.imgUrl}/>);
                    })
            }
        </div>
    )
}