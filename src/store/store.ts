import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { teamAPI } from "../services/TeamService";
import teamReducer from "./reducers/TeamSlice";
import { voterAPI } from "../services/VoterService";
import voterReducer from "./reducers/VoterSlice";
import parentReducer from "./reducers/ParentSlice";
import { parentAPI } from "../services/ParentService";

const rootReducer = combineReducers({
    teamReducer,
    [teamAPI.reducerPath]: teamAPI.reducer,
    voterReducer,
    [voterAPI.reducerPath]: voterAPI.reducer,
    parentReducer,
    [parentAPI.reducerPath]: parentAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(teamAPI.middleware, voterAPI.middleware, parentAPI.middleware)
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
