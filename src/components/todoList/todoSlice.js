import {createSlice, createEntityAdapter, createAsyncThunk, createSelector,} from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const todosAdapter = createEntityAdapter()

const initialState = todosAdapter.getInitialState({
  todosLoadingStatus: 'idle',
});

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  () => {
    const { request } = useHttp();
    return request("http://localhost:3001/todos")
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
    },
    todoToggle:(state, action)=>{
      todosAdapter.updateOne(state, action)
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

const { selectAll } = todosAdapter.getSelectors(state => state.todos)

const filteredTodosSelector = createSelector(
  state => state.filters.activeFilter,
  selectAll,
  (filter, todos) =>{
    switch(filter){
      case "done":
        return  todos.filter(todo=> todo.done)
      case "unexpected":
        return  todos.filter(todo=> !todo.done)
      default:
        return todos
    }

  })

export const filteredAndSearchTodosSelector = createSelector(
  state=>state.filters.activeQuery,
  filteredTodosSelector,
  (query,todos)=>{
    return todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
  }
)

export const {
  todoCreated,
  todoDeleted,
  todoToggle
} = actions