import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type todo = {
  id: string
  message: string
  isDone: boolean
}
type mainSliceState = {
  todoList: todo[]
  removedTodosList: todo[]
}

const initialState: mainSliceState = {
  todoList: [{ id: 'dsf', message: 'testtoddsfgfd f dg', isDone: false}],
  removedTodosList: [],
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<todo>) => {  
      state.todoList = [...state.todoList, action.payload]
    },
    transferToRemovedTodosList: (state, action: PayloadAction<todo>) => {
      state.removedTodosList = [...state.removedTodosList, action.payload]
      state.todoList = state.todoList.filter((el) => el.id !== action.payload.id)
    },
    transferAllTodosToRemovedTodosList: (state) => {
      state.removedTodosList = [...state.removedTodosList, ...state.todoList]
      state.todoList = []
    },
    changeTodoStatus: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.map((el) => {
        if (el.id === action.payload) {
          el.isDone = !el.isDone
        }
        return el
      })
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.removedTodosList = state.removedTodosList.filter((el) => el.id !== action.payload)
    },
    returnTodo: (state, action: PayloadAction<string>) => {
      const todo = state.removedTodosList.find((el) => el.id === action.payload)
      if (todo !== undefined) {
        state.todoList = [...state.todoList, todo]
      }
      state.removedTodosList = state.removedTodosList.filter((el) => el.id !== action.payload)
    },
    clearRemovedTodosList: (state) => {
      state.removedTodosList = []
    }
  },
})

export const { addTodo, transferToRemovedTodosList, transferAllTodosToRemovedTodosList, changeTodoStatus, removeTodo, clearRemovedTodosList, returnTodo } = mainSlice.actions

export default mainSlice.reducer