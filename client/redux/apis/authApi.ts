import { User } from "@/types/User"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ 
        // baseUrl: "http://localhost:5000/api/auth",
        baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
        credentials:"include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
          
            signup: builder.mutation<void,User>({
                query: UserData => {
                    return {
                        url: "/register",
                        method: "POST",
                        body: UserData
                    }
                },
                invalidatesTags: ["auth"]
            }),
              signin: builder.mutation<void,User>({
                query: UserData => {
                    return {
                        url: "/login",
                        method: "POST",
                        body: UserData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            signout: builder.mutation<void,User>({
                query: UserData => {
                    return {
                        url: "/logut",
                        method: "POST",
                        body: UserData
                    }
                },
                invalidatesTags: ["auth"]
            }),
        
        }
    }
})

export const { useSigninMutation, useSignoutMutation,useSignupMutation} = authApi
