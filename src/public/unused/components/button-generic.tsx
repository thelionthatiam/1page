import * as React from 'react';

export default function Button(props) {

  let currentClass = 'yes'
  if (!props.submitable) {
    currentClass = 'buttonInactive'
  }
  if (props.submitted) {
      currentClass = 'buttonSuccess'
  }
  return (
      <button className = {currentClass}>
        {props.buttonText}
      </button>
    )
}
