import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVote } from "../../types/types";
import { fetchVotes} from "./ActionCreators";

interface ParentState {
    votes: IVote[];
    isLoading: boolean;
    error: string;
};

const initialState: ParentState = {
    votes: [],
    isLoading: false,
    error: "",
};

export const votesSlice = createSlice({
    name: "votes",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchVotes.fulfilled.type]: (state, action: PayloadAction<IVote[]>) => {
            state.isLoading = false;
            state.error = "";
            state.votes = action.payload;
        },
        [fetchVotes.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchVotes.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

// можно экспортировать отдельно reducer или actionCreators
export default votesSlice.reducer;
