import React, {useCallback, useEffect} from 'react'
import {selectAll, fetchTodos, todoDeleted} from './todoSlice'
import {store} from '../../store'
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../spinner/Spinner";
import TodoItem from "../todoItem/TodoItem";
import {useHttp} from "../../hooks/http.hook";

export const TodoList = () => {
  const todos = selectAll(store.getState())
  const {todosLoadingStatus} = useSelector(state => state.todos)
  const dispatch = useDispatch();
  const {request} = useHttp();


  useEffect(() => {
    dispatch(fetchTodos());

  }, []);

  const onDelete = useCallback((id) => {
    request(`http://localhost:3001/todos/${id}`, "DELETE")
      .then(data => console.log(data, 'Deleted'))
      .then(dispatch(todoDeleted(id)))
      .catch(err => console.log(err));
  }, [request]);

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

    return arr.map(({id, ...props}) => {
      return (
        <TodoItem
          key={id}
          {...props}

        />
      )
    })
  }

  const elements = renderTodosList(todos)

  return (
    <>
      <h1 style={{textAlign:"center"}}>TODO APP</h1>
      <ul style={{display: 'grid', gap: 50, gridAutoFlow: "row", padding: 0, margin: 0}}>
        {elements}
      </ul>
    </>

  )
}
