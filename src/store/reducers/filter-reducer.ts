import { Dispatch } from "react";
import { damageTypes,guardTypes,rarityEGOTypes,rarityIdentityTypes,sinnerTypes,sinTypes,tagsIds } from "../../constants/skillBasedTypes";
import { sinnerType, sinType ,dmgType,guardType,rarityEGOType,rarityIdentityType} from "../../constants/types";
export type SinFilterInterface = {
    [key in sinType]:boolean;
}
export type DmgTypeFilterInterface = {
    [key in dmgType]:boolean;
}
export type GuardTypeFilterInterface = {
    [key in guardType]:boolean;
}
export type TagsFilterInterface = {
    [key:string]:boolean;
}
export type SinnerFilterInterface = {
    [key in sinnerType]: boolean;
};
export type SinnerRarityFilterInterface = {
    [key in rarityIdentityType]: boolean;
};
export type EGORarityFilterInterface = {
    [key in rarityEGOType]: boolean;
};
type FilterInterfaceValues = SinFilterInterface|DmgTypeFilterInterface|GuardTypeFilterInterface|TagsFilterInterface|SinnerFilterInterface|SinnerRarityFilterInterface|EGORarityFilterInterface;
export type FilterInterface = {
    types:{
        [key : string]:{[key:string]:boolean};
    } & {
        sin:SinFilterInterface,
        dmgType:DmgTypeFilterInterface,
        guardType:GuardTypeFilterInterface,
        tags:TagsFilterInterface,
        sinner:SinnerFilterInterface;
        rarityIdentity:SinnerRarityFilterInterface;
        rarityEGO:EGORarityFilterInterface;
    }
    search:string;
}
export enum FilterActionTypes {
    CHANGE_TYPE_FILTER = "CHANGE_TYPE_FILTER",
    SEARCH_FILTER = "SEARCH_FILTER",
    CLEAR_SECTION_FILTER = "CLEAR_SECTION_FILTER"
}

type ChangeTypeFilterPayload = string;

export interface ChangeTypeFilterAction {
    type: FilterActionTypes.CHANGE_TYPE_FILTER;
    payload: ChangeTypeFilterPayload;
}

export interface SearchFilterAction {
    type: FilterActionTypes.SEARCH_FILTER;
    payload: string;
}
export interface ClearSectionFilterAction {
    type: FilterActionTypes.CLEAR_SECTION_FILTER;
    payload: string;
}
export type FilterAction = ChangeTypeFilterAction|SearchFilterAction|ClearSectionFilterAction;

const initStateParam = <T extends string|number|symbol>(keys: T[]): { [key in T]: boolean } => { 
    let obj: { [key in T]: boolean } = {} as { [key in T]: boolean };
    keys.forEach(key=>{
        obj[key] = false;
    })
    return obj;
}

const initialState : FilterInterface = {
    types:{
        dmgType:initStateParam(damageTypes),
        guardType:initStateParam(guardTypes),
        sin:initStateParam(sinTypes),
        tags:initStateParam(tagsIds),
        sinner:initStateParam(sinnerTypes),
        rarityIdentity:initStateParam(rarityIdentityTypes),
        rarityEGO:initStateParam(rarityEGOTypes),
    },
    search:""
}


export const filterReducer = (state = initialState,action : FilterAction):FilterInterface =>{
    switch(action.type){
        case FilterActionTypes.CHANGE_TYPE_FILTER:
            return { ...applyFilter(action.payload, state) };
        case FilterActionTypes.CLEAR_SECTION_FILTER:
            return { ...clearSection(action.payload, state) };
        case FilterActionTypes.SEARCH_FILTER:
            return { ...state, search: action.payload };
        default: 
            return state
    }
}

const applyFilter = (payload: ChangeTypeFilterPayload, state: FilterInterface) => {
    const { types } = state;
    const {tags} = types;
    let keyExists = false;
    for (const key in types) {
        const current = types[key];
        if (payload in current) {
            const currentWithKey = current as { [key: string]: boolean };
            currentWithKey[payload] = !currentWithKey[payload];
            keyExists =true;
            return state;
        }
    }

    if(!keyExists) tags[payload] = true;

    return state;
  };
const clearSection = (payload: ChangeTypeFilterPayload, state: FilterInterface) => {
    const { types } = state;
    if(payload in types){
        const type = types[payload]
        for (const key in type) type[key as keyof typeof type] = false;
    }
    return state;
}
export const filterChangeTypeAction = (dispatch: Dispatch<ChangeTypeFilterAction>,payload:ChangeTypeFilterPayload) => {
    dispatch({ type: FilterActionTypes.CHANGE_TYPE_FILTER , payload})
}
export const filterClearSectionAction = (dispatch: Dispatch<ClearSectionFilterAction>,payload:string) => {
    dispatch({ type: FilterActionTypes.CLEAR_SECTION_FILTER , payload})
}
export const filterSearchAction = (dispatch: Dispatch<SearchFilterAction>,search:string) => {
    dispatch({ type: FilterActionTypes.SEARCH_FILTER , payload: search})
}