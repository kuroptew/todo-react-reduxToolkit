import React, {useCallback, useEffect} from 'react'
import {filteredAndSearchTodosSelector, fetchTodos, todoDeleted, todoToggle} from './todoSlice'
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../spinner/Spinner";
import TodoItem from "../todoItem/TodoItem";
import {useHttp} from "../../hooks/http.hook";

export const TodoList = () => {
  const filteredAndSearchTodos = useSelector(filteredAndSearchTodosSelector)
  const {todosLoadingStatus} = useSelector(state => state.todos)
  const dispatch = useDispatch();
  const {request} = useHttp();


  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const onDelete = useCallback((id) => {
    request(`http://localhost:3001/todos/${id}`, "DELETE")
      .then(dispatch(todoDeleted(id)))
  }, [request]);

  const onToggle = useCallback((todo) => {
    request(`http://localhost:3001/todos/${todo.id}`, 'PATCH', JSON.stringify({"done": !todo.done}))
      .then(dispatch(todoToggle({id: todo.id, changes: {done: !todo.done}})))
  }, [request])

  if (todosLoadingStatus === "loading") {
    return <Spinner/>;
  } else if (todosLoadingStatus === "error") {
    return <h5>Ошибка загрузки</h5>
  }

  const renderTodosList = (arr) => {
    if (arr.length === 0) {
      return (
        <div>Список дел пуст</div>
      )
    }

    return arr.map((todo) => {
      const {id, ...props} = todo
      return (
        <TodoItem
          key={id}
          {...props}
          onToggle={() => onToggle(todo)}
          onDelete={() => onDelete(id)}
        />
      )
    })
  }

  const elements = renderTodosList(filteredAndSearchTodos)

  return (
      <ul className="grid gap-5 m-0 p-0">
        {elements}
      </ul>
  )
}
