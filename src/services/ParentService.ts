import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IParent } from '../types/types';

export const parentAPI = createApi({
    reducerPath: "parentAPI",
    baseQuery: fetchBaseQuery({baseUrl: "https://gimnazist.herokuapp.com/api"}),
    tagTypes: ["parent"],
    endpoints: (builder) => ({
        fetchAllParents: builder.query<IParent[], number>({ // get-запрос
            query: (limit: number) => ({
                url: "/parents",
                params: {
                    _limit: limit
                }
            }),
            providesTags: result => ["parent"]
        }),
        pushParent: builder.mutation<IParent, IParent>({ // put-запрос
            query: (parent) => ({
                url: "/parents/",
                method: "POST",
                body: parent
            }),
            invalidatesTags: ["parent"]
        })
    })
});
