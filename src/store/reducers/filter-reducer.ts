import { Dispatch } from "react";
import { damageTypes,guardTypes,sinTypes,tagsIds } from "../../constants/skillBasedTypes";
export interface SinFilterInterface{
    [key:string]:boolean;
}
export interface DmgTypeFilterInterface{
    [key:string]:boolean;
}
export interface GuardTypeFilterInterface{
    [key:string]:boolean;
}
export interface TagsFilterInterface{
    [key:string]:boolean;
}
export interface FilterInterface{
    sin:SinFilterInterface,
    dmgType:DmgTypeFilterInterface,
    guardType:GuardTypeFilterInterface,
    tags:TagsFilterInterface,
    search:string;
}

export enum FilterActionTypes {
    CHANGE_DMG_TYPE_FILTER = "CHANGE_DMG_TYPE_FILTER",
    CHANGE_GUARD_TYPE_FILTER = "CHANGE_GUARD_TYPE_FILTER",
    CHANGE_SIN_TYPE_FILTER = "CHANGE_SIN_TYPE_FILTER",
    SEARCH_FILTER = "SEARCH_FILTER",
    CHANGE_TAG_TYPE_FILTER = "CHANGE_TAG_TYPE_FILTER",
}

export interface ChangeDmgTypeFilterAction {
    type: FilterActionTypes.CHANGE_DMG_TYPE_FILTER;
    payload: string;
}
export interface ChangeTagTypeFilterAction {
    type: FilterActionTypes.CHANGE_TAG_TYPE_FILTER;
    payload: string;
}
export interface ChangeGuardTypeFilterAction {
    type: FilterActionTypes.CHANGE_GUARD_TYPE_FILTER;
    payload: string;
}
export interface ChangeSinFilterAction {
    type: FilterActionTypes.CHANGE_SIN_TYPE_FILTER;
    payload: string;
}
export interface SearchFilterAction {
    type: FilterActionTypes.SEARCH_FILTER;
    payload: string;
}
export type FilterAction = ChangeDmgTypeFilterAction | ChangeGuardTypeFilterAction | ChangeSinFilterAction |SearchFilterAction|ChangeTagTypeFilterAction;

const initStateParam = (keys:string[]) => { 
    let obj:{[key:string]:boolean} = {};
    keys.forEach(key=>{
        obj[key] = false;
    })
    return obj;
}

const initialState : FilterInterface = {
    dmgType:initStateParam(damageTypes),
    guardType:initStateParam(guardTypes),
    sin:initStateParam(sinTypes),
    tags:initStateParam(tagsIds),
    search:""
}

export const filterReducer = (state = initialState,action : FilterAction):FilterInterface =>{
    switch(action.type){
        case FilterActionTypes.CHANGE_DMG_TYPE_FILTER:
            return { ...state, dmgType: applyFilter(action.payload, state.dmgType) };
        case FilterActionTypes.CHANGE_GUARD_TYPE_FILTER:
            return { ...state, guardType: applyFilter(action.payload, state.guardType) };
        case FilterActionTypes.CHANGE_SIN_TYPE_FILTER:
            return { ...state, sin: applyFilter(action.payload, state.sin) };
        case FilterActionTypes.CHANGE_TAG_TYPE_FILTER:
            return { ...state, tags: applyFilter(action.payload, state.tags) };
        case FilterActionTypes.SEARCH_FILTER:
            return { ...state, search: action.payload };
        default: 
            return state
    }
}


const applyFilter = <T>(key: keyof T, state: T): T => {
    const previos = state[key];
    const updatedState = { ...state, [key]: !previos };
    return updatedState;
};
export interface ChangeDmgTypeFilterAction {
    type: FilterActionTypes.CHANGE_DMG_TYPE_FILTER;
    payload: string;

}
export interface ChangeGuardTypeFilterAction {
    type: FilterActionTypes.CHANGE_GUARD_TYPE_FILTER;
    payload: string;
}
export interface ChangeSinFilterAction {
    type: FilterActionTypes.CHANGE_SIN_TYPE_FILTER;
    payload: string;

}

export const filterTagTypeAction = (dispatch: Dispatch<ChangeTagTypeFilterAction>,tag:string) => {
    dispatch({ type: FilterActionTypes.CHANGE_TAG_TYPE_FILTER , payload: tag})
}
export const filterDamageTypeAction = (dispatch: Dispatch<ChangeDmgTypeFilterAction>,dmgType:string) => {
    dispatch({ type: FilterActionTypes.CHANGE_DMG_TYPE_FILTER , payload: dmgType})
}
export const filterSinTypeAction = (dispatch: Dispatch<ChangeSinFilterAction>,sinType:string) => {
    dispatch({ type: FilterActionTypes.CHANGE_SIN_TYPE_FILTER , payload: sinType})
}
export const filterGuardTypeAction = (dispatch: Dispatch<ChangeGuardTypeFilterAction>,guardType:string) => {
    dispatch({ type: FilterActionTypes.CHANGE_GUARD_TYPE_FILTER , payload: guardType})
}
export const filterSearchAction = (dispatch: Dispatch<SearchFilterAction>,search:string) => {
    dispatch({ type: FilterActionTypes.SEARCH_FILTER , payload: search})
}