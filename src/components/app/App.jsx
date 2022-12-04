import React from 'react'
import { TodoList } from '../todoList/TodoList'
import { TodoAddForm } from '../todoAddForm/TodoAddForm'
import { TodosFilters } from '../todosFilters/TodosFilters'

export const App = () => {
  return (
    <main style={{display:"grid",width:'1440px', margin:'0 auto', gap:"20px"}}>
      <h1 style={{ textAlign: "center" }}>TODO APP</h1>
      <TodosFilters/>
      <TodoList/>
      <TodoAddForm/>
    </main>
  )
}
