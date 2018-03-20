// Actions
const HELLO_WORLD = 'HELLO_WORLD'

const helloAction = () => {
  console.log('helloWorld action', Hello)

  return {
    type: HELLO_WORLD
  }
}

// Components
class App extends React.Component {

  constructor(props) {
    super(props)
  }
  render() {
    return (
      <HelloWorld />
    )
  }
}

const Hello = ({ onClick, message }) => {
  return (
    <div>
      <h1>{ message }</h1>
      <button onClick={onClick}>Click</button>
    </div>
  )
}

Hello.propTypes = {
  onClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
}
console.log(Hello)
// Container
const mapStateToProps = (state, ownProps) => {
  return {
    message: state.helloWorld.message
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(helloAction())
    }
  }
}

const HelloWorld = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello)

// Reducers
const helloWorldReducer = (state = { message: 'Hello' }, action) => {
  console.log('action type', action.type, 'state', state)
  switch (action.type) {
    case HELLO_WORLD:
      console.log('reducer: helloWorld')
      return Object.assign({}, state, { message: 'Hello, Peenjo!' })
    default:
      return state
  }
}

const helloReducer = combineReducers({
  helloWorld: helloWorldReducer
})

// Index
let store = createStore(helloReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('login')
)
