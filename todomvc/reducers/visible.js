//import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/ActionTypes'
import * as types from '../constants/ActionTypes'
import objectAssign from 'object-assign';

const initialState =
  {
    visible: true
  }


export default function visible(state = initialState, action) {
  switch (action.type) {
    case types.DISPLAY_ALL:
      return objectAssign({}, state, {visible: !state.visible})
    default:
      return state
  }
}
