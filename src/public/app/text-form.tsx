import * as React from 'react';
import { textFormValidation } from '../behavior/validation-test'

interface TextFormStates {
  title:string;
  placeholder:string;
  errorMessage:string;
  buttonText:string;
  input:string;
  clicked:boolean;
  submitted:boolean;
  focused:boolean;
  error:boolean;
  submitable:boolean;
}

interface TextFormProps {
  title:string;
  placeholder:string;
  buttonText:string;
}

class TextForm extends React.Component {
  state:TextFormStates;

  constructor(props:TextFormProps) {
    super(props)
    this.state = {
      clicked:false,
      submitable:false,
      submitted:false,
      focused: false,
      error: false,
      input:'',
      errorMessage:'',
      placeholder:props.placeholder,
      title: props.title,
      buttonText:props.buttonText
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleSubmit(event) {
    if (this.state.submitable && !this.state.error) {
      this.setState({
        clicked:false,
        submitted:true
      })
    }
    event.preventDefault();
  }

  handleChange(event) {
    let validationAns = textFormValidation(this.state.title, event.target.value);

    if (!(validationAns === 'OK')) {
      this.setState({
        submittable:false
      })
    }

    this.setState({
      input:event.target.value,
      clicked:true
    })
  }

  handleBlur(event) {
    this.setState({
      clicked:false
    })
    console.log(this.state.title)
    let validationAns = textFormValidation(this.state.title, event.target.value)

    if (validationAns === 'OK') {
      this.setState({
        error:false,
        errorMessage:'',
        submitable:true
      })
    } else if (event.target.value === '') {
      this.setState({
        clicked:false,
        error:false,
        errorMessage:'',
        placeholder:this.props.placeholder
      })
    } else {
      this.setState({
        error:true,
        errorMessage:validationAns
      })
    }
  }

  handleClick(event) {
    this.setState({
      clicked:true,
      focused:true,
      submitted:false,
      placeholder:''
    })
  }

  render() {
    return (
      <div className = 'TextFormWrapper'>
        <FormTitle
          title = {this.state.title}
          clicked = {this.state.clicked}
          submitted = {this.state.submitted} />
        <form onSubmit = {this.handleSubmit}>
          <div>
            <Icon clicked = {this.state.clicked}/>
            <TextInput
              onChange = {this.handleChange}
              onClick = {this.handleClick}
              focused = {this.handleClick}
              blurred = {this.handleBlur}
              clicked = {this.state.clicked}
              placeholder = {this.state.placeholder}
              submitted = {this.state.submitted}
              error = {this.state.error}
              />

          </div>
          <FormError
            error = {this.state.error}
            errorMessage = {this.state.errorMessage}
            />
          <SubmitButton
            submitable = {this.state.submitable}
            submitted = {this.state.submitted}
            error = {this.state.error}
            buttonText = {this.state.buttonText}
            />

        </form>
      </div>
    )
  }
}

function FormError(props) {
  if (props.error) {
    return (
      <div>
        <p className = "textError">
          {props.errorMessage}
        </p>
      </div>
    )
  }
  return (<div></div>)
}

function SubmitButton(props) {
  let currentClass = 'yes'
  if (!props.submitable) {
    currentClass = 'buttonInactive'
  }
  if (props.error) {
     currentClass = 'buttonError'
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

function TextInput(props) {
  let currentClass = ''
  if (props.error) {
    currentClass = 'formError'
  }
  if (props.submitted) {
    currentClass = 'formSuccess'
  }
  return (
      <div className = {currentClass}>
        <input
          type = 'text'
          placeholder = {props.placeholder}
          onFocus = {props.test}
          onChange = {props.onChange}
          onClick = {props.onClick}
          onBlur = {props.blurred}
          />
      </div>
    )
}

function FormTitle(props) {
  let currentStyle = '';

  if (props.clicked) {
    currentStyle = "fadeInVert"
  } else if (props.submitted) {
    currentStyle = "fadeOutVert green"
  } else {
    currentStyle = "fadeOutVert"
  }

  return (<h4 className = {currentStyle}>{props.title}</h4>)
}

function Icon(props) {
  if (props.clicked) {
    return (
    <img
      className = 'icon fadeIn'
      src = 'https://image.flaticon.com/icons/svg/29/29076.svg'
      />
    )
  } else {
    return (
    <img
      className = 'icon fadeOut'
      src = 'https://image.flaticon.com/icons/svg/29/29076.svg'
      />
    )
  }
}

export default TextForm;
