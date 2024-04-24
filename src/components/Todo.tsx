import React from 'react'

type TodoProps = {
  message: string
  isDone: boolean
  changeTodoStatus: () => void
  removeTodo: () => void
}

export default function Todo({ message, isDone, changeTodoStatus, removeTodo }: TodoProps) {
  return (
    <div className="note">
      <div onClick={changeTodoStatus} className={`button_done ${isDone ? 'done' : null}`}>
        {isDone ? 'Done' : 'Do it !'}
      </div>
      <div className="text_note">
        {message}
      </div>
      <div onClick={removeTodo} className="remove">
        x
      </div>
    </div>
  )
}
