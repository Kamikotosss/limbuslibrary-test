import { dmgType, sinType } from "../constants/types";
import { EGOInterface } from "../store/reducers/ego-reducer";
import { DmgTypeFilterInterface, FilterInterface, GuardTypeFilterInterface, SinFilterInterface, SinnerFilterInterface } from "../store/reducers/filter-reducer";
import { IdentityInterface } from "../store/reducers/ids-reducer";
import { TSearchState } from "../store/reducers/search-reducer";
import { isIdentity } from "./isIdentity";

export const isFilterMatching = (filterState:FilterInterface,searchState:TSearchState, entity:IdentityInterface|EGOInterface) =>{
    const {types} = filterState;
    const searchValue = searchState.value;
    const {status,sinner,name,rarity} = entity;

    const regex = new RegExp(searchValue, 'i');
    if(!regex.test(name)) return false; 

    for(const key in types.tags){
        const value = types.tags[key];
        if(value === false)continue;
        if( status && !status.includes(key)) return false;
    }

    const isSinnerFilterAny = Object.values(types.sinner).some((value) => value);
    if (isSinnerFilterAny && !types.sinner[sinner as keyof SinnerFilterInterface]) return false;

    let isAnyRarityIdentity = Object.values(types.rarityIdentity).some((value) => value);
    let isAnyRarityEGO = Object.values(types.rarityEGO).some((value) => value);

    if(isIdentity(entity)){
        const {dmgType1,dmgType2,dmgType3,guardType,sin1,sin2,sin3,sinGuard} =entity;

        if((isAnyRarityEGO||isAnyRarityIdentity) && !types.rarityIdentity[rarity as keyof typeof types.rarityIdentity]) return false;

        for(const key in types.sin){
            const value = types.sin[key as keyof SinFilterInterface];
            if(value === false)continue;
            if( !([sin1,sin2,sin3,sinGuard].includes(key as sinType)) ) return false;
        }
        
        for(const key in types.dmgType){
            const value = types.dmgType[key as keyof DmgTypeFilterInterface];
            if(value === false)continue;
            if( !([dmgType1,dmgType2,dmgType3].includes(key as dmgType)) ) return false;
        }

        const isGuardTypeAny = Object.values(types.guardType).some((value) => value);
        if (isGuardTypeAny && !types.guardType[guardType as keyof GuardTypeFilterInterface]) return false;

    }else{
        const {dmgType} = entity;

        if((isAnyRarityEGO||isAnyRarityIdentity) && !types.rarityEGO[rarity as keyof typeof types.rarityEGO]) return false;

        let activeSins = Object.entries(types.sin).map((value) => {
            const [sinType , isActive] = value;
            if(isActive) return sinType;
        });
        if(activeSins.length){
            const typedActiveSins = activeSins as string[];
            const isActiveSins = typedActiveSins.every((value) => {
                return entity[value as keyof EGOInterface] !== 0;
            }) 
            if(!isActiveSins) return false;
        } 

        for(const key in types.dmgType){
            const value = types.dmgType[key as keyof DmgTypeFilterInterface];
            if(value === false)continue;
            if( !(dmgType === (key as dmgType)) ) return false;
        }
        
    }

   
    return true;
}
