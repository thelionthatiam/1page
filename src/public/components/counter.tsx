import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Counter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { current, total, onIncrement, onDecrement, onReset } = this.props
    return (
      <div>
        <p>
          Current: { current }
          Total: { total }
        </p>
        <div>
          <button onClick = { onIncrement }>INCREMENT</button>
          {' '}
          <button onClick = { onDecrement }>DECREMENT</button>
          {' '}
          <button onClick = { onReset }>RESET ALL</button>
        </div>
      </div>
    )
  }
}

Counter.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onIncrement:PropTypes.func.isRequired,
  onDecrement:PropTypes.func.isRequired,
  onReset:PropTypes.func.isRequired
}

export default Counter;
