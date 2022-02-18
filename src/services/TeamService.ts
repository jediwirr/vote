import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITeam } from '../types/types';

export const teamAPI = createApi({
    reducerPath: "teamAPI",
    baseQuery: fetchBaseQuery({baseUrl: "https://gimnazist.herokuapp.com/api"}),
    tagTypes: ["team"],
    endpoints: (builder) => ({
        fetchAllTeams: builder.query<ITeam[], number>({ // get-запрос
            query: (limit: number) => ({
                url: "/teams",
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ["team"]
        }),
        updateTeam: builder.mutation<ITeam, ITeam>({ // put-запрос
            query: (team) => ({
                url: "/teams/" + team.pk,
                method: "PUT",
                body: team
            }),
            invalidatesTags: ["team"]
        })
    })
});
