import { dmgType, guardType, sinType } from "../../constants/types";


export interface IdentityInterface{
    imgUrl:number,
    sinner:string,
    name:string,
    rarity:string,
    season:number,
    sin1:sinType,
    sin2:sinType,
    sin3:sinType,
    sinGuard:sinType,
    dmgType1:dmgType,
    dmgType2:dmgType,
    dmgType3:dmgType,
    guardType:guardType,
    idTier:string,
    passive1Tier:string,
    passive2Tier:string,
    sinPassive1:string,
    countPassive1:number,
    sinPassive2:string,
    countPassive2:number,
    slash:string,
    pierce:string,
    blunt:string,
    status:string,
}

export enum IdsActionTypes {
    FETCH_IDS = "FETCH_IDS",
    FETCH_IDS_SUCCESS = "FETCH_IDS_SUCCESS",
    FETCH_IDS_ERROR = "FETCH_IDS_ERROR",
}
export interface IdsState {
    ids:null|Array<IdentityInterface>;
    loading:boolean;
    error: null|string;
}

export interface FetchIdsAction {
    type: IdsActionTypes.FETCH_IDS;
}
export interface FetchIdsActionSuccess {
    type: IdsActionTypes.FETCH_IDS_SUCCESS;
    payload: Array<IdentityInterface>;
}
export interface FetchIdsActionError {
    type: IdsActionTypes.FETCH_IDS_ERROR;
    payload: string;

}
export type IdsAction = FetchIdsAction | FetchIdsActionError | FetchIdsActionSuccess ;

const initialState : IdsState = {
    ids:null,
    loading:false,
    error: null
}

export const idsReducer = (state = initialState,action : IdsAction):IdsState =>{
    switch(action.type){
        case IdsActionTypes.FETCH_IDS:
            return {loading: true , error: null ,ids:null }
        case IdsActionTypes.FETCH_IDS_SUCCESS:
            return {loading: false , error: null ,ids: action.payload}
        case IdsActionTypes.FETCH_IDS_ERROR:
            return {loading: false , error: action.payload ,ids:null} 
        default: 
            return state
    }
}

//export const fetchIdsAction = (payload) => ({type:IdsActionTypes.FETCH_IDS,payload});

