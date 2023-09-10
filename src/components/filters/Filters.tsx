import React from "react";
import { useDispatch } from "react-redux";
import { damageTypes , guardTypes,sinTypes} from "../../constants/skillBasedTypes";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { DmgTypeFilterInterface, GuardTypeFilterInterface, SinFilterInterface ,FilterInterface ,ChangeDmgTypeFilterAction,ChangeGuardTypeFilterAction,ChangeSinFilterAction,FilterActionTypes} from "../../store/reducers/filter-reducer";
import "./Filters.css";

export const Filters:React.FC = () => {
    const filterState = useTypedSelector(state => state.filterReducer);
    const dispatch = useDispatch();
    const handleFilterChange = (type: keyof FilterInterface,key:keyof DmgTypeFilterInterface|keyof GuardTypeFilterInterface|keyof SinFilterInterface) =>{
        switch(type){
            case "dmgType":
                dispatch<ChangeDmgTypeFilterAction>({payload:key,type:FilterActionTypes.CHANGE_DMG_TYPE_FILTER});
                return;
            case "guardType":
                dispatch<ChangeGuardTypeFilterAction>({payload:key,type:FilterActionTypes.CHANGE_GUARD_TYPE_FILTER});
                return;
            case "sin":
                dispatch<ChangeSinFilterAction>({payload:key,type:FilterActionTypes.CHANGE_SIN_TYPE_FILTER});
                return;
            default:
                return;
        }
    }
    return (
        <div className={"filters"}>
                {
                    sinTypes.map((type)=>{
                        return(
                            <div key={`${type}${Math.random()}`} className={["filters-image-container" , (filterState["sin"][type] ) ? "filters-image-container--active": ""].join(" ")} onClick={()=>handleFilterChange("sin",type)}>
                                <img className={"filters-image"} src={`/images/sins/${type}.png`} alt={`${type}`}></img>
                            </div>
                        )
                    })
                }
                {
                    damageTypes.map((type)=>{
                        return(
                            <div key={`${type}${Math.random()}`}  className={["filters-image-container" , (filterState["dmgType"][type] ) ? "filters-image-container--active": ""].join(" ")} onClick={()=>handleFilterChange("dmgType",type)}>
                                <img className={"filters-image"} src={`/images/dmg-type/${type}.png`} alt={`${type}`}></img>
                            </div>
                        )
                    })
                }
                {
                    guardTypes.map((type)=>{
                        return(
                            <div key={`${type}${Math.random()}`} className={["filters-image-container" , (filterState["guardType"][type] ) ? "filters-image-container--active": ""].join(" ")} onClick={()=>handleFilterChange("guardType",type)}>
                                <img className={"filters-image"} src={`/images/guard-type/${type}.png`} alt={`${type}`}></img>
                            </div>
                        )
                    })
                }
        </div>
    )
}