import React from 'react'
import { TodoList } from '../todoList/TodoList'
import { TodoAddForm } from '../todoAddForm/TodoAddForm'
import { TodosFilters } from '../todosFilters/TodosFilters'

export const App = () => {
  return (
    <main  className="grid gap-8 my-0 mx-auto max-w-screen-xl">
      <h1 className="text-center text-5xl font-bold text-red-800">TODO APP</h1>
      <TodosFilters/>
      <TodoList/>
      <TodoAddForm/>
    </main>
  )
}
