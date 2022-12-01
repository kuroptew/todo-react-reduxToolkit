import { configureStore } from "@reduxjs/toolkit";
import todos from '../components/todoList/todoSlice'

export const store = configureStore({
  reducer: {todos},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})
