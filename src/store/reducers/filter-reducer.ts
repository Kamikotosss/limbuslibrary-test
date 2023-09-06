
export interface SinFilterInterface{
    wrath:boolean,
    glut:boolean,
    gloom:boolean,
    envy:boolean,
    lust:boolean,
    pride:boolean,
    sloth:boolean,
}
export interface DmgTypeFilterInterface{
    pierce:boolean,
    blunt:boolean,
    slash:boolean,
}
export interface GuardTypeFilterInterface{
    counter:boolean,
    guard:boolean,
    evade:boolean,
}
export interface FilterInterface{
    sin:SinFilterInterface,
    dmgType:DmgTypeFilterInterface,
    guardType:GuardTypeFilterInterface,
}

export enum FilterActionTypes {
    CHANGE_DMG_TYPE_FILTER = "CHANGE_DMG_TYPE_FILTER",
    CHANGE_GUARD_TYPE_FILTER = "CHANGE_GUARD_TYPE_FILTER",
    CHANGE_SIN_TYPE_FILTER = "CHANGE_SIN_TYPE_FILTER",
}
// export interface FilterState {
//     filter:FilterInterface;
// }

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
export type FilterAction = ChangeDmgTypeFilterAction | ChangeGuardTypeFilterAction | ChangeSinFilterAction ;

const initialState : FilterInterface = {
    dmgType:{
        blunt:false,
        pierce:false,
        slash:false,
    },
    guardType:{
        counter:false,
        evade:false,
        guard:false,
    },
    sin:{
        envy:false,
        gloom:false,
        glut:false,
        lust:false,
        pride:false,
        sloth:false,
        wrath:false
    }
}

export const filterReducer = (state = initialState,action : FilterAction):FilterInterface =>{
    switch(action.type){
        case FilterActionTypes.CHANGE_DMG_TYPE_FILTER:
            return { ...state, dmgType: applyFilter(action.payload as keyof DmgTypeFilterInterface, state.dmgType) };
        case FilterActionTypes.CHANGE_GUARD_TYPE_FILTER:
            return { ...state, guardType: applyFilter(action.payload as keyof GuardTypeFilterInterface, state.guardType) };
        case FilterActionTypes.CHANGE_SIN_TYPE_FILTER:
            return { ...state, sin: applyFilter(action.payload as keyof SinFilterInterface, state.sin) };
        default: 
            return state
    }
}


const applyFilter = <T>(key: keyof T, state: T): T => {
    const previos = state[key];
    const updatedState = { ...state, [key]: !previos };
    return updatedState;
};