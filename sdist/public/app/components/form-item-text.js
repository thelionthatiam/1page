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
var validation_1 = require("../helpers/validation");
var TextForm = /** @class */ (function (_super) {
    __extends(TextForm, _super);
    function TextForm(props) {
        var _this = _super.call(this, props) || this;
        _this.submitable = function (bool) {
            console.log();
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
    TextForm.prototype.render = function () {
        return (React.createElement("div", { className: 'textFormWrapper' },
            React.createElement(FormTitle, { title: this.title, firstClick: this.state.firstClick, clicked: this.state.clicked, submitted: this.props.submitted }),
            React.createElement("div", null,
                React.createElement(Icon, { clicked: this.state.clicked }),
                React.createElement(TextInput, { firstClick: this.state.firstClick, clicked: this.state.clicked, onClick: this.handleClick, onFocus: this.handleFocus, onChange: this.handleChange, blurred: this.handleBlur, placeholder: this.props.placeholder, submitted: this.props.submitted, error: this.state.error, value: this.state.value })),
            React.createElement(FormError, { error: this.state.error, errorMessage: this.state.errorMessage })));
    };
    TextForm.prototype.handleChange = function (event) {
        this.setState({
            value: event.target.value
        }, function () {
            console.log(this.state.value);
        });
        var validationAns = validation_1.textFormValidation(this.title, event.target.value);
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
                submitable: false,
            }, function () {
                this.state.submitable ? this.submitable(true) : this.submitable(false);
            });
        }
        else {
            this.setState({
                error: true,
                submitable: false,
            }, function () {
                this.state.submitable ? this.submitable(true) : this.submitable(false);
            });
        }
        this.setState({
            input: event.target.value,
            clicked: true
        });
    };
    TextForm.prototype.handleFocus = function () {
        console.log('sup');
        if (!this.state.firstClick) {
            this.setState({
                firstClick: true,
            });
        }
    };
    TextForm.prototype.handleBlur = function (event) {
        console.log(this.title, event.target.value);
        this.setState({ clicked: false });
        var validationAns = validation_1.textFormValidation(this.title, event.target.value);
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
    TextForm.prototype.handleClick = function (event) {
        this.setState({
            firstClick: true,
            clicked: true,
            focused: true,
            submitted: false,
            placeholder: ''
        });
    };
    TextForm.prototype.componentDidMount = function () {
        this.submitable(false);
    };
    return TextForm;
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
            React.createElement("input", { type: 'text', placeholder: this.state.placeholder, value: this.props.value, onFocus: this.props.test, onChange: this.props.onChange, onClick: this.props.onClick, onBlur: this.props.blurred, onFocus: this.props.onFocus })));
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
    return (React.createElement("img", { className: props.clicked ? 'icon fadeIn' : 'icon fadeIn', src: 'https://image.flaticon.com/icons/svg/29/29076.svg' }));
}
exports.default = TextForm;
//# sourceMappingURL=form-item-text.js.map