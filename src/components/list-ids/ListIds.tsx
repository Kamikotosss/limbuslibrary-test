import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { searchChangeTargetRefAction } from "../../store/reducers/search-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { ItemEntity } from "../item-entity/ItemEntity";
import "./ListIds.css";

export const ListIds:React.FC = () => {
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const {ids} = useTypedSelector(state => state.idsReducer);
    const filterState = useTypedSelector(state => state.filterReducer);
    const searchState = useTypedSelector(state => state.searchReducer);
    let count = 0;
    useEffect(()=>{
        searchChangeTargetRefAction(dispatch,containerRef)
    },[])
    let idsList = ids?.map((item:IdentityInterface)=>{
        if (!isFilterMatching(filterState,searchState,item)) return null;
        count++;
        return (<ItemEntity entity={item} key={item.imgUrl}/>);
    })
    return (
        <section ref={containerRef} className={"list-ids"}>
        <h2>{`Найдено Личностей (${count})`}</h2>
        {
            count ? <div className={"list-ids-content"} >
                {idsList}
            </div>
            : <p>
                Нет доступных Личностей. Попробуйте отключить некоторые из фильтров.
            </p>
        }
        </section>
        
    )
}