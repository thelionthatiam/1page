import TextForm from './text-form-item';
import * as React from 'react';

interface FormWrapperStates {
  submitable:any;
  submitted:boolean;
  clicked:boolean;
}

class FormWrapper extends React.Component {
  states:FormWrapperStates;
  formItems:any;
  testObj:any;

  constructor(props:FormWrapper) {
    super(props)
    this.state = {
      submitted: false,
      submitable: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidation = this.getValidation.bind(this);
    this.testObj = {}
  }

  getValidation(arr) {
    for (let k in this.testObj) {
      if (k === arr[0]) {
        console.log(arr[0], 'is already in array')
      }
    }
    let obj = this.testObj;
    obj[arr[0]] = arr[1]
    let bool = this.submitCheck()
    this.setState({
      submitable:bool
    })
  }

  getData = (dataFromChild) => {
    this.getValidation(dataFromChild)
  }

  submitCheck() {
    for (let k in this.testObj) {
      if (this.testObj[k] === false) {
        return false
      }
    }
    return true
  }

  handleSubmit(event) {
    if (this.state.submitable) {
      this.setState({
        submitted:true
      })
    }
    event.preventDefault();
  }

  render() {
    const childWithProp = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
          sendData: this.getData,
          submitted: this.state.submitted
        });
    });

    return (

        <div className ='formWrapper'>
          <form onSubmit = {this.handleSubmit}>
            {childWithProp}
            <SubmitButton
              submitable = {this.state.submitable}
              submitted = {this.state.submitted}
              onClick = {this.handleSubmit}
              buttonText = 'create account'
              />
          </form>
        </div>

    )
  }
}

function SubmitButton(props) {
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



export default FormWrapper;
