"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var password_strength_1 = require("../behavior/password-strength");
var validation_helpers_1 = require("../behavior/validation-helpers");
var PasswordForm = /** @class */ (function (_super) {
    __extends(PasswordForm, _super);
    function PasswordForm(props) {
        var _this = _super.call(this, props) || this;
        _this.submitable = function (bool) {
            var arr = [_this.title, bool, _this.state.value];
            _this.props.sendData(arr);
        };
        _this.state = {
            firstClick: false,
            clicked: false,
            submitable: false,
            focused: false,
            error: false,
            input: '',
            value: '',
            errorMessage: '',
            submitted: props.submitted,
            entropy: 0
        };
        _this.title = props.title;
        _this.buttonText = props.buttonText;
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.submitable = _this.submitable.bind(_this);
        return _this;
    }
    PasswordForm.prototype.render = function () {
        return (React.createElement("div", { className: 'textFormWrapper' },
            React.createElement(FormTitle, { title: this.title, firstClick: this.state.firstClick, clicked: this.state.clicked, submitted: this.props.submitted }),
            React.createElement("div", null,
                React.createElement(Icon, { clicked: this.state.clicked }),
                React.createElement(TextInput, { firstClick: this.state.firstClick, clicked: this.state.clicked, onClick: this.handleClick, onFocus: this.handleFocus, onChange: this.handleChange, blurred: this.handleBlur, placeholder: this.props.placeholder, submitted: this.props.submitted, error: this.state.error, value: this.state.value })),
            React.createElement(PasswordQuality, { entropy: this.state.entropy, newPass: this.props.newPass }),
            React.createElement(FormError, { error: this.state.error, errorMessage: this.state.errorMessage })));
    };
    PasswordForm.prototype.handleChange = function (event) {
        this.setState({
            value: event.target.value
        }, function () {
            console.log(this.state.value);
        });
        var entropy = password_strength_1.default(event.target.value);
        var validationAns = validation_helpers_1.textFormValidation(this.title, entropy.toString());
        if (!(validationAns === 'OK')) {
            this.setState({
                entropy: entropy,
                submitable: false
            });
        }
        this.setState({
            entropy: entropy,
            input: event.target.value,
            clicked: true
        });
    };
    PasswordForm.prototype.handleFocus = function () {
        if (!this.state.firstClick) {
            this.setState({
                firstClick: true,
            });
        }
    };
    PasswordForm.prototype.handleBlur = function (event) {
        console.log(this.title, event.target.value);
        this.setState({ clicked: false });
        var validationAns = validation_helpers_1.textFormValidation(this.title, this.state.entropy.toString());
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
            });
        }
        else {
            this.setState({
                error: true,
                errorMessage: validationAns
            }, function () {
                this.state.submitable ? this.submitable(true) : this.submitable(false);
            });
        }
    };
    PasswordForm.prototype.handleClick = function (event) {
        this.setState({
            firstClick: true,
            clicked: true,
            focused: true,
            submitted: false,
            placeholder: ''
        });
    };
    PasswordForm.prototype.componentDidMount = function () {
        this.submitable(false);
    };
    return PasswordForm;
}(React.Component));
var TextInput = /** @class */ (function (_super) {
    __extends(TextInput, _super);
    function TextInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            placeholder: _this.props.placeholder,
        };
        return _this;
    }
    TextInput.prototype.render = function () {
        var currentClass = 'formInactive';
        if (this.props.firstClick) {
            currentClass = '';
        }
        else if (this.props.error) {
            currentClass = 'formError';
        }
        if (this.props.submitted) {
            currentClass = 'formSuccess';
        }
        return (React.createElement("div", { className: currentClass },
            React.createElement("input", { type: 'password', placeholder: this.state.placeholder, value: this.props.value, onFocus: this.props.test, onChange: this.props.onChange, onClick: this.props.onClick, onBlur: this.props.blurred, onFocus: this.props.onFocus })));
    };
    return TextInput;
}(React.Component));
function FormError(props) {
    return (React.createElement("div", null,
        React.createElement("p", { className: props.error ? "textError fadeIn" : 'fadeOut' }, props.errorMessage)));
}
function FormTitle(props) {
    var currentStyle = '';
    if (props.firstClick) {
        currentStyle = "fadeInVert";
    }
    else {
        currentStyle = "fadeOutVert";
    }
    if (props.submitted) {
        currentStyle = 'titleSuccess';
    }
    return (React.createElement("h5", { className: currentStyle }, props.title));
}
function Icon(props) {
    return (React.createElement("img", { className: props.clicked ? 'icon fadeIn' : 'icon fadeIn', src: 'https://image.flaticon.com/icons/svg/26/26053.svg' }));
}
function PasswordQuality(props) {
    var proportion = convertToProportion(props.entropy, 128);
    var entropyReport;
    var passIndicator = {
        width: proportion + '%',
        height: '4px',
        background: '#9f2121',
        transition: '300ms'
    };
    if (props.entropy > 0) {
        entropyReport = React.createElement("p", { className: 'fadeIn textError marginPaddingFix' },
            " ",
            "Not strong enough. Entropy: " + props.entropy,
            " ");
    }
    if (props.entropy > 59) {
        passIndicator.background = '#068721';
        entropyReport = React.createElement("p", { className: 'fadeIn textSuccess marginPaddingFix' },
            " ",
            "This should be strong enough. Entropy: " + props.entropy,
            " ");
    }
    console.log('new pass', props.newPass);
    if (props.newPass) {
        return (React.createElement("div", { className: 'passwordQualityWrapper' },
            React.createElement("div", null,
                React.createElement("div", { style: passIndicator })),
            entropyReport));
    }
    else {
        return null;
    }
}
// HELPER
function convertToProportion(number, max) {
    if (number !== 0) {
        return ((number / max) * 100);
    }
    else {
        return 0;
    }
}
exports.default = PasswordForm;
//# sourceMappingURL=form-item-password.js.map