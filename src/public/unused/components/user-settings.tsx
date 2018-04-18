import React, {Component} from 'react';

function UserSettings(props) {
  console.log(props)
  let printableSettings = JSON.stringify(props.settings)
  return (
    <div>
      <h1>user settings</h1>
      { printableSettings }
    </div>
  )
}

export default UserSettings;