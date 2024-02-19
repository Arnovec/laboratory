import { createStore, combineReducers } from "redux";
import { countReducer } from "./countReducer";

const rootReducer = combineReducers({
    count: countReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
