import { combineReducers } from "redux";
import { idsReducer } from "./ids-reducer";
import { egoReducer } from "./ego-reducer";
import { filterReducer } from "./filter-reducer";

export const rootReducer = combineReducers({
    idsReducer,
    egoReducer,
    filterReducer
})
export type RootState = ReturnType<typeof rootReducer>