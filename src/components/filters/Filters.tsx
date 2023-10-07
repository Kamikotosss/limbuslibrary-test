import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { damageTypes , guardTypes,sinnerTypes,sinTypes,tagsIds} from "../../constants/skillBasedTypes";
import { sinnerType } from "../../constants/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { filterGuardTypeAction,filterSearchAction,filterSinTypeAction,filterDamageTypeAction, FilterInterface, SinFilterInterface, DmgTypeFilterInterface, GuardTypeFilterInterface, filterTagTypeAction, filterSinnerTypeAction} from "../../store/reducers/filter-reducer";
import { FilterButton } from "./filter-button/FilterButton";
import "./Filters.css";

export const Filters:React.FC = () => {
    const filterState = useTypedSelector(state => state.filterReducer);
    const statusesState = useTypedSelector(state => state.statusesReducer);
    const isTBLocation = useLocation().pathname.includes("/teambuilder");
    const dispatch = useDispatch();
    const [isAllFiltersShown,setIsAllFiltersShown] = useState(false);
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
            case "sinner":
                filterSinnerTypeAction(dispatch,key as sinnerType);
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
            imgExtension:".png",
            data:sinTypes
        },
        {
            type:"dmgType" as "dmgType" ,
            imgsFolder:"dmg-type",
            imgExtension:".png",
            data:damageTypes
        },
        {
            type:"guardType" as "guardType",
            imgsFolder:"guard-type",
            imgExtension:".png",
            data:guardTypes
        },
        {
            type:"sinner" as "guardType",
            imgsFolder:"sinners-icons",
            imgExtension:".webp",
            data:sinnerTypes
        },
    ];
    const filters2 =[
        {
            type:"tags" as "tags",
            imgsFolder:"tags",
            imgExtension:".png",
            data:(isAllFiltersShown && statusesState.statuses) ? statusesState.statuses.map(s => s.id) : tagsIds,
        },
    ];
    return (
        <div className={"filters"}>
                {filters.map((filter,index)=>{
                    return  <section key={filter.type+index}>
                    {filter.data.map((type)=>{
                        let isTypeActive = filterState[filter.type][type];
                        return <FilterButton 
                                handleFilterChange={()=>handleFilterChange(filter.type,type)} 
                                imgSrc={`/images/${filter.imgsFolder}/${type}${filter.imgExtension}`}
                                isTypeActive={isTypeActive}
                                type={type}
                                key={type} /> 
                    })}
                    </section>
                })
                }

                {!isTBLocation && <form>
                    <input placeholder="Search..." onChange={(e)=>{handleInputCHange(e)}}></input>
                </form>
                }
                
                {filters2.map((filter,index)=>{
                        return <section className={`${isAllFiltersShown ? "section-expanded": ""}`} key={filter.type+index}> {filter.data.map((type)=>{
                            let isTypeActive = filterState[filter.type][type];
                            return <FilterButton 
                            handleFilterChange={()=>handleFilterChange(filter.type,type)} 
                            imgSrc={`/images/${filter.imgsFolder}/${type}${filter.imgExtension}`}
                            isTypeActive={isTypeActive}
                            type={type}
                            key={type} /> 
                        })}
                        <button 
                        className={"filters-filter"} 
                        onClick={()=>{setIsAllFiltersShown(!isAllFiltersShown)}}>
                            <div className="filters-filter-tooltip">{isAllFiltersShown ? "Show less" : "Show more"} </div>
                            {isAllFiltersShown ? "<<<" : "..."}
                        </button>
                        </section>
                    })
                }
                
        </div>
    )
}
