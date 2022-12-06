import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { todoCreated } from '../todoList/todoSlice';
import {useHttp} from '../../hooks/http.hook'

export const TodoAddForm = () => {
  const {request}=useHttp()
  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { isSubmitting, isDirty, isValid  }, reset } = useForm({
    defaultValues: {
      title: '',
      done: false,
    },
    mode:"onChange"
  });

  const addNewTodo = data => {
    const newTodoItem = {...data, id:uuidv4()}
    request("http://localhost:3001/todos", "POST", JSON.stringify(newTodoItem))
    .then(dispatch(todoCreated(newTodoItem)))
    reset()
  };

  return (
    <form onSubmit={handleSubmit(addNewTodo)} className="flex flex-col justify-center align-middle p-4 border-2 border-red-800 rounded-2xl">
      <input 
      type="text"
      placeholder="Title..."
      {...register("title", { required: true })}
        className="block w-full mb-4 p-4 text-sm text-red-800 border border-red-800 rounded-lg placeholder-red-800 bg-gray-50 focus:ring-red-800 focus:border-red-800"
      />
      <button type="submit" disabled={!isDirty || !isValid} className="w-40 bg-green-800 self-center bg-opacity-70 py-3 px-4 text-white rounded-lg tracking-wide hover:bg-opacity-100 transition duration-500 font-medium disabled:bg-red-800 disabled:text-yellow-500">Add</button>
    </form>
  );
}
