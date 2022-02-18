import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITeam } from '../types/types';

export const teamAPI = createApi({
    reducerPath: "teamAPI",
    baseQuery: fetchBaseQuery({baseUrl: "https://gimnazist.herokuapp.com/api"}),
    endpoints: (builder) => ({
        fetchAllTeams: builder.query<ITeam[], number>({ // get-запрос
            query: (limit: number) => ({
                url: "/teams",
                params: {
                    _limit: limit
                }
            })
        })
    })
});
