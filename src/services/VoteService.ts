import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IVote } from '../types/types';

export const voteAPI = createApi({
    reducerPath: "voteAPI",
    baseQuery: fetchBaseQuery({baseUrl: "https://gimnazist.herokuapp.com/api"}),
    tagTypes: ["vote"],
    endpoints: (builder) => ({
        fetchAllVotes: builder.query<IVote[], number>({ // get-запрос
            query: (limit: number) => ({
                url: "/votes",
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ["vote"]
        }),
        updateVote: builder.mutation<IVote, IVote>({ // put-запрос
            query: (vote) => ({
                url: "/votes/" + vote.pk,
                method: "PUT",
                body: vote
            }),
            invalidatesTags: ["vote"]
        })
    })
});
