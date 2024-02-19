import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "@shared/api/jsonplaceholder/interfaces";

export const jsonplaceholderApi = createApi({
  reducerPath: "todosAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    fetchAllToDos: builder.query<Todo[], void>({
      query: () => ({ url: "/todos" }),
    }),
  }),
});

export const {
  useFetchAllToDosQuery
} = jsonplaceholderApi
