import { apiSlice } from "./apiSlice";
import { TODO_URL } from "../constants";

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation({
      query: (data) => ({
        url: `${TODO_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    allTodos: builder.query({
      query: () => `${TODO_URL}/get-todos`,
    }),
    recentTodos: builder.query({
      query: () => `${TODO_URL}/recent-todos`,
    }),
    updateTodo: builder.mutation({
      query: ({ id, updatedTodo }) => ({
        url: `${TODO_URL}/${id}/update`,
        method: "PUT",
        body: updatedTodo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `${TODO_URL}/${id}/delete`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useAllTodosQuery,
  useRecentTodosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApiSlice;
