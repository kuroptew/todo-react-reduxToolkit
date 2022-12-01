import React from 'react'
import { TodoList } from '../todoList/TodoList'
import { TodoAddForm } from '../todoAddForm/TodoAddForm'

export const App = () => {
  return (
    <main style={{width:'1440px', margin:'0 auto'}}>
      <TodoList/>
      <TodoAddForm/>
    </main>
  )
}
