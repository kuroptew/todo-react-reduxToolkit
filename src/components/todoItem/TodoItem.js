import React from 'react'

const TodoItem = ({title, done, onDelete}) => {
  return (
    <div style={{display:'flex', justifyContent:"space-around", border:"1px solid black", padding:"20px", borderRadius:20}}>
      <h2>{title}</h2>
      <input
        type={"checkbox"}
        checked={done}
      />
      <button onClick={onDelete}>Delete</button>
    </div>
  )
}

export default TodoItem