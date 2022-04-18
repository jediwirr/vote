import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IParent } from "../../types/types";
import { fetchParents} from "./ActionCreators";

interface ParentState {
    parents: IParent[];
    isLoading: boolean;
    error: string;
};

const initialState: ParentState = {
    parents: [],
    isLoading: false,
    error: "",
};

export const parentsSlice = createSlice({
    name: "parent",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchParents.fulfilled.type]: (state, action: PayloadAction<IParent[]>) => {
            state.isLoading = false;
            state.error = "";
            state.parents = action.payload;
        },
        [fetchParents.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchParents.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

// можно экспортировать отдельно reducer или actionCreators
export default parentsSlice.reducer;
