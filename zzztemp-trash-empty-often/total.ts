export default function total(state = 0, action) {
  switch (action.type) {
    case 'PRESSED':
      return state + 1
    case 'RESET':
      return 0
    default:
      return state
  }
}
