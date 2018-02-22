(function (React,ReactDOM) {
'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function emailTest(val) {
    var emailCheck = /^[a-zA-Z0-9\._\$%\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9]{2,6}/;
    if (emailCheck.test(val) === true) {
        return "OK";
    }
    else {
        return "That's not a valid email. Try again";
    }
}
function phoneTest(val) {
    var phoneCheck = /^[0-9]+$/;
    if (phoneCheck.test(val) === true) {
        return "OK";
    }
    else {
        return "Somehow you used something other than numbers. It's a phone number, so stick to numbers.";
    }
}
function nameTest(val) {
    var check = /^[a-zA-Z -]+$/;
    if (check.test(val) === true) {
        return "OK";
    }
    else {
        return "Honestly, if this is your name, sorry. This is a very weak regex right now.";
    }
}
function textFormValidation(type, val) {
    if (type === 'email') {
        return emailTest(val);
    }
    else if (type === 'phone') {
        return phoneTest(val);
    }
    else if (type === 'name') {
        return nameTest(val);
    }
    else {
        return 'this code is broken';
    }
}

var TextForm = (function (_super) {
    __extends(TextForm, _super);
    function TextForm(props) {
        _super.call(this, props);
        this.state = {
            clicked: false,
            submitable: false,
            focused: false,
            error: false,
            input: '',
            errorMessage: '',
            placeholder: props.placeholder,
            submitted: props.submitted
        };
        this.title = props.title;
        this.buttonText = props.buttonText;
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.submitable = this.submitable.bind(this);
    }
    TextForm.prototype.handleChange = function (event) {
        var validationAns = textFormValidation(this.title, event.target.value);
        if (!(validationAns === 'OK')) {
            this.setState({
                submitable: false
            });
        }
        this.setState({
            input: event.target.value,
            clicked: true
        });
    };
    TextForm.prototype.handleBlur = function (event) {
        this.setState({ clicked: false });
        var validationAns = textFormValidation(this.title, event.target.value);
        if (validationAns === 'OK') {
            this.setState({
                error: false,
                errorMessage: '',
                submitable: true,
            }, function () {
                this.state.submitable ? this.submitable(true) : this.submitable(false);
            });
        }
        else if (event.target.value === '') {
            this.setState({
                clicked: false,
                error: false,
                errorMessage: '',
                placeholder: this.state.placeholder
            });
        }
        else {
            this.setState({
                error: true,
                errorMessage: validationAns
            });
        }
    };
    TextForm.prototype.handleClick = function (event) {
        this.setState({
            clicked: true,
            focused: true,
            submitted: false,
            placeholder: ''
        });
    };
    TextForm.prototype.submitable = function (bool) {
        var arr = [this.title, bool];
        this.props.sendData(arr);
    };
    TextForm.prototype.render = function () {
        return (React.createElement("div", null, React.createElement(FormTitle, {title: this.title, clicked: this.state.clicked, submitted: this.submitted}), React.createElement("div", null, React.createElement(Icon, {clicked: this.state.clicked}), React.createElement(TextInput, {onChange: this.handleChange, onClick: this.handleClick, focused: this.handleClick, blurred: this.handleBlur, clicked: this.state.clicked, placeholder: this.state.placeholder, submitable: this.state.submitable, submitted: this.submitted, error: this.state.error})), React.createElement(FormError, {error: this.state.error, errorMessage: this.state.errorMessage})));
    };
    return TextForm;
}(React.Component));
function FormError(props) {
    var currentClass = 'fadeOut';
    if (props.error) {
        currentClass = "textError fadeIn";
    }
    return (React.createElement("div", null, React.createElement("p", {className: currentClass}, props.errorMessage)));
}
function TextInput(props) {
    var currentClass = '';
    if (props.error) {
        currentClass = 'formError';
    }
    if (props.submitted) {
        currentClass = 'formSuccess';
    }
    return (React.createElement("div", {className: currentClass}, React.createElement("input", {type: 'text', placeholder: props.placeholder, onFocus: props.test, onChange: props.onChange, onClick: props.onClick, onBlur: props.blurred})));
}
function FormTitle(props) {
    var currentStyle = '';
    if (props.clicked) {
        currentStyle = "fadeInVert";
    }
    else if (props.submitted) {
        currentStyle = "fadeOutVert green";
    }
    else {
        currentStyle = "fadeOutVert";
    }
    return (React.createElement("h4", {className: currentStyle}, props.title));
}
function Icon(props) {
    // let currentClass = '';
    // if (props.clicked) {
    //     currentClass = 'icon fadeIn'
    // } else {
    //     currentClass = 'icon fadeOut'
    // }
    return (React.createElement("img", {className: props.clicked ? 'icon fadeIn' : 'icon fadeOut', src: 'https://image.flaticon.com/icons/svg/29/29076.svg'}));
}

var FormWrapper = (function (_super) {
    __extends(FormWrapper, _super);
    function FormWrapper(props) {
        _super.call(this, props);
        this.state = {
            submitted: false,
            submitable: false
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.getValidation = this.getValidation.bind(this);
        this.testObj = {};
    }
    FormWrapper.prototype.getValidation = function (arr) {
        for (var k in this.testObj) {
            if (k === arr[0]) {
                console.log(arr[0], 'is already in array');
            }
        }
        var obj = this.testObj;
        obj[arr[0]] = arr[1];
        // console.log(arr, obj)
        // let bool = this.submitCheck()
        // this.setState({
        //   submitable:bool
        // })
    };
    FormWrapper.prototype.submitCheck = function () {
        for (var k in this.testObj) {
            if (this.testObj[k] === false) {
                return false;
            }
        }
        return true;
    };
    // handleSubmit(event) {
    //   if (this.state.submitable && !this.state.error) {
    //     this.setState({
    //       clicked:false,
    //       submitted:true
    //     })
    //   }
    //   event.preventDefault();
    // }
    FormWrapper.prototype.render = function () {
        console.log('THIS IS THE FINAL CUT: ', this.state.submitable);
        return (React.createElement("form", {onSubmit: this.handleSubmit}, React.createElement(TextForm, {title: 'email', placeholder: 'type in your email address', sendData: this.getValidation}), React.createElement(TextForm, {title: 'phone', placeholder: 'type in your phone address', sendData: this.getValidation}), React.createElement(SubmitButton, {buttonText: 'create account'})));
    };
    return FormWrapper;
}(React.Component));
function SubmitButton(props) {
    var currentClass = 'yes';
    if (!props.submitable) {
        currentClass = 'buttonInactive';
    }
    if (props.error) {
        currentClass = 'buttonError';
    }
    if (props.submitted) {
        currentClass = 'buttonSuccess';
    }
    return (React.createElement("button", {className: currentClass}, props.buttonText));
}

ReactDOM.render(React.createElement(FormWrapper, null), document.getElementById('root'));

}(React,ReactDOM));
//# sourceMappingURL=bundle.js.map
