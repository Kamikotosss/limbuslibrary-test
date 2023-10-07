import { Dispatch } from "react";
import { damageTypes,guardTypes,sinnerTypes,sinTypes,tagsIds } from "../../constants/skillBasedTypes";
import { sinnerType } from "../../constants/types";
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
export type SinnerFilterInterface = {
    [key in sinnerType]: boolean;
};
export type FilterInterface = {
    sin:SinFilterInterface,
    dmgType:DmgTypeFilterInterface,
    guardType:GuardTypeFilterInterface,
    tags:TagsFilterInterface,
    sinner:SinnerFilterInterface;
    search:string;
}

export enum FilterActionTypes {
    CHANGE_DMG_TYPE_FILTER = "CHANGE_DMG_TYPE_FILTER",
    CHANGE_GUARD_TYPE_FILTER = "CHANGE_GUARD_TYPE_FILTER",
    CHANGE_SIN_TYPE_FILTER = "CHANGE_SIN_TYPE_FILTER",
    SEARCH_FILTER = "SEARCH_FILTER",
    CHANGE_TAG_TYPE_FILTER = "CHANGE_TAG_TYPE_FILTER",
    CHANGE_SINNER_TYPE_FILTER = "CHANGE_SINNER_TYPE_FILTER",
}
export interface ChangeSinnerTypeFilterAction {
    type: FilterActionTypes.CHANGE_SINNER_TYPE_FILTER;
    payload: sinnerType;
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
export type FilterAction = ChangeSinnerTypeFilterAction|ChangeDmgTypeFilterAction | ChangeGuardTypeFilterAction | ChangeSinFilterAction |SearchFilterAction|ChangeTagTypeFilterAction;

const initStateParam = <T extends string|number|symbol>(keys: T[]): { [key in T]: boolean } => { 
    let obj: { [key in T]: boolean } = {} as { [key in T]: boolean };
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
    sinner:initStateParam(sinnerTypes),
    search:""
}
type TestInterface = {
    sin:SinFilterInterface,
    dmgType:DmgTypeFilterInterface,
    guardType:GuardTypeFilterInterface,
    tags:TagsFilterInterface,
    sinner:SinnerFilterInterface;
    search:string;
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
        case FilterActionTypes.CHANGE_SINNER_TYPE_FILTER:
            return { ...state, sinner: applyFilter(action.payload, state.sinner) };
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
export const filterSinnerTypeAction = (dispatch: Dispatch<ChangeSinnerTypeFilterAction>,sinner:sinnerType) => {
    dispatch({ type: FilterActionTypes.CHANGE_SINNER_TYPE_FILTER , payload: sinner})
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