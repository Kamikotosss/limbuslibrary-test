import { combineReducers } from "redux";
import { idsReducer } from "./ids-reducer";
import { egoReducer } from "./ego-reducer";
import { filterReducer } from "./filter-reducer";
import { tbReducer } from "./tb-reducer";
import { statusesReducer } from "./statuses-reducer";
import { leftMenuReducer } from "./left-menu-reducer";

export const rootReducer = combineReducers({
    idsReducer,
    egoReducer,
    filterReducer,
    tbReducer,
    statusesReducer,
    leftMenuReducer

})
export type RootState = ReturnType<typeof rootReducer>