import React from 'react'
import s from './style.module.scss'
import { useAppSelector } from 'hooks'
import Todo from 'components/Todo'
import { generateRandomLetterId } from 'helpers'
import { useAppDispatch } from 'hooks'
import { Link } from 'react-router-dom'
import { addTodo, transferToRemovedTodosList, transferAllTodosToRemovedTodosList, changeTodoStatus } from 'store/mainSlice'

export default function MainModule() {
  const todoList = useAppSelector((state) => state.main.todoList)
  const dispatch = useAppDispatch()
  const [text, setText] = React.useState('')
  const handleAddTodo = () => {
    if (text.trim().length < 3) {
      return
    }
    dispatch(addTodo({ id: generateRandomLetterId(10), message: text, isDone: false }))
    setText('')
  }

  return (
    <>
      <div className={s.head}>
        <h1 className={s.title}>To Do List</h1>
        <Link to='/removed-todos' className={s.deleted_todos}>Deleted Todos</Link>
      </div>

      <div className={s.main_block}>
        <div className={s.left_part}>
          <div className={s.w_note}>Write note</div>
          <textarea onChange={(e) => setText(e.target.value)} value={text} placeholder='Enter something!'></textarea>
          <div onClick={handleAddTodo} className={s.button}>Add note</div>
          <div onClick={() => dispatch(transferAllTodosToRemovedTodosList())} className={s.button}>Clear List</div>
        </div>

        <div className={s.right_part}>
          <h3 className={s.note_title}>Your notes</h3>
          {
            todoList.length === 0 && <div className={s.no_notes}>No notes</div>
          }

          <div className='note_block'>

            {
              todoList.map((el) => <Todo
                key={el.id}
                changeTodoStatus={() => dispatch(changeTodoStatus(el.id))}
                removeTodo={() => dispatch(transferToRemovedTodosList(el))}
                message={el.message}
                isDone={el.isDone}
              />)
            }

          </div>
        </div>
      </div>
    </>
  )
}
