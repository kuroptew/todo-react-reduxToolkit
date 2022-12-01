import {createSlice, createEntityAdapter, createAsyncThunk,} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";



const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
  todosLoadingStatus: 'idle',
});

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    const { request } = useHttp();
    return await request("http://localhost:3001/todos")
  }
)


const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoCreated: (state, action) => {
      todosAdapter.addOne(state, action.payload)
    },
    todoDeleted: (state, action) => {
      todosAdapter.removeOne(state, action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.todosLoadingStatus = 'loading'
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todosLoadingStatus = 'idle';
        todosAdapter.setAll(state, action.payload)
      })
      .addCase(fetchTodos.rejected, state => {
        state.todosLoadingStatus = 'error'
      })
      .addDefaultCase(() => {})
  }
})

const { actions, reducer } = todosSlice;

export default reducer;

console.log(todosAdapter)
console.log(todosSlice)


export const { selectAll } = todosAdapter.getSelectors(state => state.todos)


export const {
  todoCreated,
  todoDeleted
} = actions