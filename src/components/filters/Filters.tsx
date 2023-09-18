import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { damageTypes , guardTypes,sinTypes,tagsIds} from "../../constants/skillBasedTypes";
import useThrottling from "../../hooks/useThrottling";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { filterGuardTypeAction,filterSearchAction,filterSinTypeAction,filterDamageTypeAction, FilterInterface, SinFilterInterface, DmgTypeFilterInterface, GuardTypeFilterInterface, filterTagTypeAction} from "../../store/reducers/filter-reducer";
import "./Filters.css";

export const Filters:React.FC = () => {
    const filterState = useTypedSelector(state => state.filterReducer);
    const dispatch = useDispatch();
    console.log(filterState.search)
    const handleFilterChange = (type: string,key:string) =>{
        switch(type){
            case "dmgType":
                filterDamageTypeAction(dispatch,key);
                return;
            case "guardType":
                filterGuardTypeAction(dispatch,key);
                return;
            case "sin":
                filterSinTypeAction(dispatch,key);
                return;
            case "tags":
                filterTagTypeAction(dispatch,key);
                return;
            default:
                return;
        }
    }
    const handleInputCHange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const val = e.target.value || "";
        filterSearchAction(dispatch, val);
       
    }
    const filters = [
        {
            type:"sin" as "sin",
            imgsFolder:"sins",
            data:sinTypes
        },
        {
            type:"dmgType" as "dmgType" ,
            imgsFolder:"dmg-type",
            data:damageTypes
        },
        {
            type:"guardType" as "guardType",
            imgsFolder:"guard-type",
            data:guardTypes
        },
    ];
    const filters2 =[
        {
            type:"tags" as "tags",
            imgsFolder:"tags",
            data:tagsIds
        },
    ];
    return (
        <div className={"filters"}>
                {filters.map(filter=>{
                    return  <section>
                    {filter.data.map((type)=>{
                        let isTypeActive = filterState[filter.type][type];
                        return (
                        <button key={`${type}${Math.random()}`} 
                        className={["filters-image-container" , (isTypeActive) ? "filters-image-container--active": ""].join(" ")} 
                        onClick={()=>handleFilterChange(filter.type,type)}>
                        <img className={"filters-image"} src={`/images/${filter.imgsFolder}/${type}.png`} alt={`${type}` } ></img>
                        {isTypeActive && <div className="filters-frame-line"/>}
                        </button>
                        )
                    })}
                    </section>
                })
                }

                <form>
                    <input placeholder="Search..." onChange={(e)=>{handleInputCHange(e)}}></input>
                </form>
                <section>
                    {filters2.map(filter=>{
                        return filter.data.map((type)=>{
                            let isTypeActive = filterState[filter.type][type];
                            return (
                            <button key={`${type}${Math.random()}`} 
                            className={["filters-image-container" , (isTypeActive) ? "filters-image-container--active": ""].join(" ")} 
                            onClick={()=>handleFilterChange(filter.type,type)}>
                            <img className={"filters-image"} src={`/images/${filter.imgsFolder}/${type}.png`} alt={`${type}` } ></img>
                            {isTypeActive && <div className="filters-frame-line"/>}
                            </button>
                            )
                        })
                    })
                    }
                </section>
        </div>
    )
}
