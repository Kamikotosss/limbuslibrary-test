import { Dispatch } from "react";
import { AnyAction } from "redux";

const initialState = false;

export const leftMenuReducer = (state = initialState,action : AnyAction):boolean =>{
    switch(action.type){
        case "LEFT_MENU_CHANGE_LAYOUT":
            return !state;
        default: 
            return state
    }
}

export const leftMenuChangeLayoutAction = (dispatch: Dispatch<AnyAction>) => {
    dispatch({ type: "LEFT_MENU_CHANGE_LAYOUT" })
}
