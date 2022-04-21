import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IVoter } from '../types/types';

export const voterAPI = createApi({
    reducerPath: "voterAPI",
    baseQuery: fetchBaseQuery({baseUrl: "https://gimnazist.herokuapp.com/api"}),
    tagTypes: ["voter"],
    endpoints: (builder) => ({
        fetchAllVoters: builder.query<IVoter[], number>({ // get-запрос
            query: (limit: number) => ({
                url: "/voters",
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ["voter"]
        }),
        pushVoter: builder.mutation<IVoter, IVoter>({ // put-запрос
            query: (voter) => ({
                url: "/voters/",
                method: "POST",
                body: voter
            }),
            invalidatesTags: ["voter"]
        }),
        deleteVoter: builder.mutation<IVoter, number>({
            query: (id) => ({
                url: `/voters/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["voter"]
        })
    })
});
