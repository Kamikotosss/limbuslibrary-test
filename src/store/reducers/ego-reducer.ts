export interface EGOInterface{
    imgUrl:number,
    sinner:string,
    name:string,
    rarity:string,
    season:number,
    wrath:number,
    lust:number,
    sloth:number,
    glut:number,
    gloom:number,
    pride:number,
    envy:number,
    egoRes:string,
    egoTier:string,
    
}
export enum EGOActionTypes {
    FETCH_EGO = "FETCH_EGO",
    FETCH_EGO_SUCCESS = "FETCH_EGO_SUCCESS",
    FETCH_EGO_ERROR = "FETCH_EGO_ERROR",
}
export interface EGOState {
    ego:null|Array<EGOInterface>;
    loading:boolean;
    error: null|string;
}

export interface FetchEGOAction {
    type: EGOActionTypes.FETCH_EGO;
}
export interface FetchEGOActionSuccess {
    type: EGOActionTypes.FETCH_EGO_SUCCESS;
    payload: Array<EGOInterface>;
}
export interface FetchEGOActionError {
    type: EGOActionTypes.FETCH_EGO_ERROR;
    payload: string;

}
export type EGOAction = FetchEGOAction | FetchEGOActionError | FetchEGOActionSuccess ;

const initialState : EGOState = {
    ego:null,
    loading:false,
    error: null
}

export const egoReducer = (state = initialState,action : EGOAction):EGOState =>{
    switch(action.type){
        case EGOActionTypes.FETCH_EGO:
            return {loading: true , error: null ,ego:null }
        case EGOActionTypes.FETCH_EGO_SUCCESS:
            return {loading: false , error: null ,ego: action.payload}
        case EGOActionTypes.FETCH_EGO_ERROR:
            return {loading: false , error: action.payload ,ego:null} 
        default: 
            return state
    }
}


