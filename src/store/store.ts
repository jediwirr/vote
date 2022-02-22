import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { teamAPI } from "../services/TeamService";
import teamReducer from "./reducers/TeamSlice";

const rootReducer = combineReducers({
    teamReducer,
    [teamAPI.reducerPath]: teamAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(teamAPI.middleware)
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
