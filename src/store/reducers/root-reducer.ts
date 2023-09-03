import { combineReducers } from "redux";
import { idsReducer } from "./ids-reducer";

export const rootReducer = combineReducers({
    idsReducer
})
export type RootState = ReturnType<typeof rootReducer>