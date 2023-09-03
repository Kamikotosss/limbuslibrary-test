export interface IdentityInterface{
    imgUrl:string,
    sinner:string,
    name:string,
    rarity:string,
    season:string,
    sin1:string,
    sin2:string,
    sin3:string,
    sinGuard:string,
    dmgType1:string,
    dmgType2:string,
    dmgType3:string,
    guardType:string,
    idTier:string,
    passive2Tier:string,
    passive1Tier:string,
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


