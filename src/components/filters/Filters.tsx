import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { damageTypes , guardTypes,sinnerTypes,sinTypes,tagsIds} from "../../constants/skillBasedTypes";
import { dmgType, sinnerType, sinType } from "../../constants/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { filterSearchAction, filterChangeTypeAction} from "../../store/reducers/filter-reducer";
import { FilterButton } from "./filter-button/FilterButton";
import "./Filters.css";

export const Filters:React.FC = () => {
    const filterState = useTypedSelector(state => state.filterReducer);
    const statusesState = useTypedSelector(state => state.statusesReducer);
    const isTBLocation = useLocation().pathname.includes("/teambuilder");
    const dispatch = useDispatch();
    const [isAllFiltersShown,setIsAllFiltersShown] = useState(false);
    const handleFilterChange = (type: string,key:string) =>{
        filterChangeTypeAction(dispatch,key);
    }
    const handleInputCHange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const val = e.target.value || "";
        filterSearchAction(dispatch, val);
       
    }
    const filters = [
        {
            type:"sin" ,
            imgsFolder:"sins",
            imgExtension:".png",
            data:sinTypes
        },
        {
            type:"dmgType" ,
            imgsFolder:"dmg-type",
            imgExtension:".png",
            data:damageTypes
        },
        {
            type:"guardType" ,
            imgsFolder:"guard-type",
            imgExtension:".png",
            data:guardTypes
        },
        {
            type:"sinner" ,
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
                    const type = filter.type;  
                    return  <section key={type+index}>
                    {filter.data.map((subtype)=>{
                        let isTypeActive = filterState.types[type];
                        return <FilterButton 
                                handleFilterChange={()=>handleFilterChange(filter.type,subtype)} 
                                imgSrc={`/images/${filter.imgsFolder}/${subtype}${filter.imgExtension}`}
                                isTypeActive={isTypeActive[subtype as keyof typeof isTypeActive]}
                                type={subtype}
                                key={subtype} /> 
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
                            let isTypeActive = filterState.types[filter.type][type];
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
