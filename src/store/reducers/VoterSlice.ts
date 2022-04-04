import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVoter } from "../../types/types";
import { fetchTeams, fetchVoters } from "./ActionCreators";

interface VoterState {
    voters: IVoter[];
    isLoading: boolean;
    error: string;
};

const initialState: VoterState = {
    voters: [],
    isLoading: false,
    error: "",
};

export const voterSlice = createSlice({
    name: "voter",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchVoters.fulfilled.type]: (state, action: PayloadAction<IVoter[]>) => {
            state.isLoading = false;
            state.error = "";
            state.voters = action.payload;
        },
        [fetchVoters.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchVoters.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

// можно экспортировать отдельно reducer или actionCreators
export default voterSlice.reducer;
