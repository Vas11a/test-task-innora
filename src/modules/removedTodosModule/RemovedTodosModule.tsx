import React from 'react'
import s from './style.module.scss'
import { Link } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from 'hooks'
import Todo from 'components/Todo'
import { returnTodo, removeTodo, clearRemovedTodosList } from 'store/mainSlice'

export default function RemovedTodosModule() {
  const removerdList = useAppSelector((state) => state.main.removedTodosList)
  const dispatch = useAppDispatch()
  return (
    <>
      <div className={s.head}>
        <h1 className={s.title}>Removed Todos</h1>
        <Link to='/' className={s.go_back}>Go back</Link>
      </div>

      <div className='note_block' style={{ paddingTop: '50px' }}>
      <div onClick={() => dispatch(clearRemovedTodosList())} className={s.button}>Clear List</div>
        {removerdList.length === 0 && <div className={s.no_notes}>Trash can is empty</div>}
        {
          removerdList.map((el) =>
            <div key={el.id} className={s.todo_help_class}>
              <div  style={{ opacity: 0.5 }}>
                <Todo
                  message={el.message}
                  isDone={el.isDone}
                  changeTodoStatus={() => { }}
                  removeTodo={() => { }}
                />
              </div>
              <div onClick={() => dispatch(returnTodo(el.id))} className={s.return}>Return</div>
              <div onClick={() => dispatch(removeTodo(el.id))} className={s.return} style={{ color: 'red', borderColor: 'red' }}>Remove prem.</div>
            </div>
          )
        }

      </div>

    </>
  )
}
