import { combineReducers } from 'redux'
import { HELLO_WORLD, RESET } from '../actions/hello'

let initialState = { message: 'Hello' }

const helloWorld = (state=initialState, action) => {
  switch (action.type) {
    case HELLO_WORLD:
      return Object.assign({}, state, { message: 'Hello, World!' })
    case RESET:
    	return state = initialState
    default:
      return state
  }
}

const hello = combineReducers({
  helloWorld
})

export default hello
