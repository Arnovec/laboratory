import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { jsonplaceholderApi } from "@shared/api/jsonplaceholder";

const combineRedusers = combineReducers({
    [jsonplaceholderApi.reducerPath]: jsonplaceholderApi.reducer,
});

export const store = configureStore({
    reducer: combineRedusers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jsonplaceholderApi.middleware),
});
