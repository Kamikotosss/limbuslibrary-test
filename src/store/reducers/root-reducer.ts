import { combineReducers } from "redux";
import { idsReducer } from "./ids-reducer";
import { egoReducer } from "./ego-reducer";

export const rootReducer = combineReducers({
    idsReducer,
    egoReducer
})
export type RootState = ReturnType<typeof rootReducer>