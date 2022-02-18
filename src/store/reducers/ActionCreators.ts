import { ITeam } from "../../types/types";
// import { AppDispatch } from "../store";
import axios from "axios";
// import { teamSlice } from "./TeamSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// type MyError = { message: string };

// export const fetchTeams = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(teamSlice.actions.teamsFetching());
//         const response = await axios.get<ITeam[]>('https://gimnazist.herokuapp.com/api/teams/');
//         dispatch(teamSlice.actions.teamsFetchingSuccess(response.data));
//     } catch (error) {
//         const e = error as MyError;
//         dispatch(teamSlice.actions.teamsFetchingError(e.message));
//     }
// };

export const fetchTeams = createAsyncThunk(
    "teams/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<ITeam[]>('https://gimnazist.herokuapp.com/api/teams/');
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить список команд");
        }
    }
);
