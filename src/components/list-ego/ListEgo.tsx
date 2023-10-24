import React, { useEffect, useRef } from "react";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { searchChangeTargetRefAction } from "../../store/reducers/search-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { ItemEntity } from "../item-entity/ItemEntity";
import "./ListEgo.css";

export const ListEgo:React.FC = () => {
    const ego = useQueryClient().getQueryData("ego") as EGOInterface[]|null;
    const filterState = useTypedSelector(state => state.filterReducer);
    const searchState = useTypedSelector(state => state.searchReducer);
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        searchChangeTargetRefAction(dispatch,containerRef)
    },[])
    let count = 0;
    const egoList = ego?.map((item:EGOInterface)=>{
        if (!isFilterMatching(filterState,searchState,item)) return null;
        count++;
        return (<ItemEntity entity={item} key={item.imgUrl}/>);
    })
    return (
        <section ref={containerRef} className={"list-ego"}>
        <h2 >{`Найдено ЭГО (${count})`}</h2>
        {
            count ? <div className={"list-ego-content"} >
                {egoList}
            </div>
            : <p>
                Нет доступных ЭГО. Попробуйте отключить некоторые из фильтров.
            </p>
        }
        </section>
    )
}