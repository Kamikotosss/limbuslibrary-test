import { combineReducers } from "redux";
import { idsReducer } from "./ids-reducer";
import { egoReducer } from "./ego-reducer";
import { filterReducer } from "./filter-reducer";
import { tbReducer } from "./tb-reducer";

export const rootReducer = combineReducers({
    idsReducer,
    egoReducer,
    filterReducer,
    tbReducer

})
export type RootState = ReturnType<typeof rootReducer>