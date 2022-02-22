import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeam } from "../../types/types";
import { fetchTeams } from "./ActionCreators";

interface TeamState {
    teams: ITeam[];
    isLoading: boolean;
    error: string;
};

const initialState: TeamState = {
    teams: [],
    isLoading: false,
    error: "",
};

export const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTeams.fulfilled.type]: (state, action: PayloadAction<ITeam[]>) => {
            state.isLoading = false;
            state.error = "";
            state.teams = action.payload;
        },
        [fetchTeams.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchTeams.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

// можно экспортировать отдельно reducer или actionCreators
export default teamSlice.reducer;
