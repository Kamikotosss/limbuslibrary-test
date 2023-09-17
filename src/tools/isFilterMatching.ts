import { dmgType, sinType } from "../constants/types";
import { EGOInterface } from "../store/reducers/ego-reducer";
import { DmgTypeFilterInterface, FilterInterface, GuardTypeFilterInterface, SinFilterInterface } from "../store/reducers/filter-reducer";
import { IdentityInterface } from "../store/reducers/ids-reducer";
import { isIdentity } from "./isIdentity";

export const isFilterMatching = (filterState:FilterInterface,entity:IdentityInterface|EGOInterface) =>{
    if(isIdentity(entity)){
        const {rarity , imgUrl,name ,dmgType1,dmgType2,dmgType3,guardType,sin1,sin2,sin3,sinGuard} =entity;
        const searchString = filterState.search;
        const regex = new RegExp(searchString, 'i');
        if(!regex.test(name)) return false; 

        for(const key in filterState.guardType){
            const value = filterState.guardType[key as keyof GuardTypeFilterInterface];
            if(value === false)continue;
            if( guardType !== key ) return false;
        }
        for(const key in filterState.dmgType){
            const value = filterState.dmgType[key as keyof DmgTypeFilterInterface];
            if(value === false)continue;
            if( !([dmgType1,dmgType2,dmgType3].includes(key as dmgType)) ) return false;
        }
        for(const key in filterState.sin){
            const value = filterState.sin[key as keyof SinFilterInterface];
            if(value === false)continue;
            if( !([sin1,sin2,sin3,sinGuard].includes(key as sinType)) ) return false;
        }
    }

   
    return true;
}

