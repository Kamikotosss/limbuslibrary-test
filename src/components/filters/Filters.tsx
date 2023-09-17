import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { damageTypes , guardTypes,sinTypes} from "../../constants/skillBasedTypes";
import useThrottling from "../../hooks/useThrottling";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { filterGuardTypeAction,filterSearchAction,filterSinTypeAction,filterDamageTypeAction} from "../../store/reducers/filter-reducer";
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
            default:
                return;
        }
    }
    const handleInputCHange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const val = e.target.value || "";
        filterSearchAction(dispatch, val);
       
    }
    
    return (
        <div className={"filters"}>
                {
                    sinTypes.map((type)=>{
                        return(
                            <button key={`${type}${Math.random()}`} 
                                className={["filters-image-container" , (filterState["sin"][type] ) ? "filters-image-container--active": ""].join(" ")} 
                                onClick={()=>handleFilterChange("sin",type)}>
                                <img className={"filters-image"} src={`/images/sins/${type}.png`} alt={`${type}` } ></img>
                                {filterState["sin"][type] && <div className="filters-frame-line"/>}
                            </button>
                        )
                    })
                }
                {
                    damageTypes.map((type)=>{
                        return(
                            <button key={`${type}${Math.random()}`}  className={["filters-image-container" , (filterState["dmgType"][type] ) ? "filters-image-container--active": ""].join(" ")} onClick={()=>handleFilterChange("dmgType",type)}>
                                 
                                <img className={"filters-image"} src={`/images/dmg-type/${type}.png`} alt={`${type}`}></img>
                                {filterState["dmgType"][type] && <div className="filters-frame-line"/>}
                            </button>
                        )
                    })
                }
                {
                    guardTypes.map((type)=>{
                        return(
                            <button key={`${type}${Math.random()}`} className={["filters-image-container" , (filterState["guardType"][type] ) ? "filters-image-container--active": ""].join(" ")} onClick={()=>handleFilterChange("guardType",type)}>
                                <img className={"filters-image"} src={`/images/guard-type/${type}.png`} alt={`${type}`}></img>
                                {filterState["guardType"][type] && <div className="filters-frame-line"/>}
                            </button>
                        )
                    })
                }
                <form>
                    <input placeholder="Search..." onChange={(e)=>{handleInputCHange(e)}}></input>
                </form>
        </div>
    )
}
