const initialState = {
  current: 0,
  total: 0
}

export default function counter(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        current: state.current + 1,
        total: state.total + 1
      }
    case 'DECREMENT':
      return {
        current: state.current - 1,
        total: state.total + 1
      }
    case 'RESET':
      return initialState;
    default:
      return state
  }
}
