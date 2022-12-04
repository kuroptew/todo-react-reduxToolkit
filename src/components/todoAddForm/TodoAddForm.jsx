import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { todoCreated } from '../todoList/todoSlice';
import {useHttp} from '../../hooks/http.hook'

export const TodoAddForm = () => {
  const {request}=useHttp()
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      done: false,
    }
  });

  const addNewTodo = data => {
    const newTodoItem = {...data, id:uuidv4()}
    request("http://localhost:3001/todos", "POST", JSON.stringify(newTodoItem))
    .then(dispatch(todoCreated(newTodoItem)))
    reset()
  };

  return (
    <form onSubmit={handleSubmit(addNewTodo)}>
      <input 
      type='text'
      placeholder='Title TODO'
      {...register('title', { required: true })} 
      />
      {/*{errors.exampleRequired && <span>This field is required</span>}*/}
      <button type='submit'>Add</button>
    </form>
  );
}
