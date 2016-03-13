//import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'
import * as types from '../constants/ActionTypes'
import objectAssign from 'object-assign';

const initialState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

export default function todos(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TODO:
      return [
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }, 
        ...state
      ]

    case types.DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case types.EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          objectAssign({}, todo, { text: action.text }) :
          todo
      )

    case types.COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          objectAssign({}, todo, { completed: !todo.completed }) :
          todo
      )

    case types.COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => objectAssign({}, todo, {
        completed: !areAllMarked
      }))

    case types.CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}
