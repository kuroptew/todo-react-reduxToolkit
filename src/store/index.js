import { configureStore } from "@reduxjs/toolkit";
import todos from "../components/todoList/todoSlice"
import filters from "../components/todosFilters/filtersSlice"

export const store = configureStore({
  reducer: {todos, filters},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})
