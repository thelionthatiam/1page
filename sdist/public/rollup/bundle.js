(function (React,ReactDOM) {
'use strict';

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
        return "Somehow you used something other than numbers. It's a phone number, so stick to numbers.";
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

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TextForm = /** @class */ (function (_super) {
    __extends(TextForm, _super);
    function TextForm(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            clicked: false,
            submitable: false,
            submitted: false,
            focused: false,
            error: false,
            input: '',
            errorMessage: '',
            placeholder: props.placeholder,
            title: props.title,
            buttonText: props.buttonText
        };
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        return _this;
    }
    TextForm.prototype.handleSubmit = function (event) {
        if (this.state.submitable && !this.state.error) {
            this.setState({
                clicked: false,
                submitted: true
            });
        }
        event.preventDefault();
    };
    TextForm.prototype.handleChange = function (event) {
        var validationAns = textFormValidation(this.state.title, event.target.value);
        if (!(validationAns === 'OK')) {
            this.setState({
                submittable: false
            });
        }
        this.setState({
            input: event.target.value,
            clicked: true
        });
    };
    TextForm.prototype.handleBlur = function (event) {
        this.setState({
            clicked: false
        });
        console.log(this.state.title);
        var validationAns = textFormValidation(this.state.title, event.target.value);
        if (validationAns === 'OK') {
            this.setState({
                error: false,
                errorMessage: '',
                submitable: true
            });
        }
        else if (event.target.value === '') {
            this.setState({
                clicked: false,
                error: false,
                errorMessage: '',
                placeholder: this.props.placeholder
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
    TextForm.prototype.render = function () {
        return (React.createElement("div", { className: 'TextFormWrapper' },
            React.createElement(FormTitle, { title: this.state.title, clicked: this.state.clicked, submitted: this.state.submitted }),
            React.createElement("form", { onSubmit: this.handleSubmit },
                React.createElement("div", null,
                    React.createElement(Icon, { clicked: this.state.clicked }),
                    React.createElement(TextInput, { onChange: this.handleChange, onClick: this.handleClick, focused: this.handleClick, blurred: this.handleBlur, clicked: this.state.clicked, placeholder: this.state.placeholder, submitted: this.state.submitted, error: this.state.error })),
                React.createElement(FormError, { error: this.state.error, errorMessage: this.state.errorMessage }),
                React.createElement(SubmitButton, { submitable: this.state.submitable, submitted: this.state.submitted, error: this.state.error, buttonText: this.state.buttonText }))));
    };
    return TextForm;
}(React.Component));
function FormError(props) {
    if (props.error) {
        return (React.createElement("div", null,
            React.createElement("p", { className: "textError" }, props.errorMessage)));
    }
    return (React.createElement("div", null));
}
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
    return (React.createElement("button", { className: currentClass }, props.buttonText));
}
function TextInput(props) {
    var currentClass = '';
    if (props.error) {
        currentClass = 'formError';
    }
    if (props.submitted) {
        currentClass = 'formSuccess';
    }
    return (React.createElement("div", { className: currentClass },
        React.createElement("input", { type: 'text', placeholder: props.placeholder, onFocus: props.test, onChange: props.onChange, onClick: props.onClick, onBlur: props.blurred })));
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
    return (React.createElement("h4", { className: currentStyle }, props.title));
}
function Icon(props) {
    if (props.clicked) {
        return (React.createElement("img", { className: 'icon fadeIn', src: 'https://image.flaticon.com/icons/svg/29/29076.svg' }));
    }
    else {
        return (React.createElement("img", { className: 'icon fadeOut', src: 'https://image.flaticon.com/icons/svg/29/29076.svg' }));
    }
}

ReactDOM.render(React.createElement(TextForm, { title: 'email', placeholder: 'type in your email address', buttonText: 'submit email' }), document.getElementById('email'));
ReactDOM.render(React.createElement(TextForm, { title: 'phone', placeholder: 'type in your phone number', buttonText: 'submit phone' }), document.getElementById('phone'));
ReactDOM.render(React.createElement(TextForm, { title: 'name', placeholder: 'type in your phone name', buttonText: 'submit name' }), document.getElementById('name'));
//# sourceMappingURL=index.js.map

}(React,ReactDOM));
//# sourceMappingURL=bundle.js.map
