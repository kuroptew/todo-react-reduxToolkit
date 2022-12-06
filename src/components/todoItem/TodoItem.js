import React from 'react'

const TodoItem = ({ title, done, onDelete, onToggle}) => {


  return (
    <div className="flex justify-between items-center gap-10 border-2 border-red-800 p-4 rounded-xl">
      <h2 className="text-2xl font-bold text-red-800">{title}</h2>
      <div className="flex items-center ">
          <input
            type={"checkbox"}
            checked={done}
            onChange={onToggle}
            className=""
             id="green-checkbox" type="checkbox"
                 className="w-4 h-4 mr-3 text-green-700 bg-gray-100 rounded border-gray-300 focus:ring-green-700 dark:focus:ring-green-700 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>

        <button onClick={onDelete} className="bg-red-800 py-3 px-4 text-yellow-500 rounded-lg tracking-wide hover:bg-opacity-70 transition duration-500 font-medium">Delete</button>
      </div>
    </div>

  )
}

export default TodoItem