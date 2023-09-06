import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { damageTypes , guardTypes,sinTypes} from "../../constants/skillBasedTypes";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { DmgTypeFilterInterface, GuardTypeFilterInterface, SinFilterInterface ,FilterInterface ,ChangeDmgTypeFilterAction,ChangeGuardTypeFilterAction,ChangeSinFilterAction,FilterActionTypes} from "../../store/reducers/filter-reducer";
import "./TierListNav.css";

export const TierListNav:React.FC = () => {
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
        <div className={"tier-list-nav-container"}>
            <nav className={"tier-list-nav"}>
                <ul>
                    <li><Link to="/tierlist/identities">Личности</Link></li>
                    <li><Link to="/tierlist/ego">ЭГО</Link></li>
                    <li><Link to="/tierlist/passives">Пассивки</Link></li>
                </ul>
            </nav>
        </div>
    )
}
