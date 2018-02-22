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
var text_form_item_1 = require("./text-form-item");
var React = require("react");
var FormWrapper = /** @class */ (function (_super) {
    __extends(FormWrapper, _super);
    function FormWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            submitted: false,
        };
        _this.formItems = props.formItems;
        // this.handleSubmit = this.handleSubmit.bind(this);
        _this.getData = _this.getData.bind(_this);
        return _this;
    }
    FormWrapper.prototype.getData = function (val) {
        this.setState({
            submitable: 
        });
        console.log('parent', val);
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
        return (React.createElement("form", { onSubmit: this.handleSubmit },
            React.createElement(text_form_item_1.default, { title: 'email', placeholder: 'type in your email address', buttonText: 'submit email', sendData: this.getData }),
            React.createElement(SubmitButton
            // submitable = {this.state.submitable}
            // submitted = {this.state.submitted}
            // error = {this.state.error}
            , { 
                // submitable = {this.state.submitable}
                // submitted = {this.state.submitted}
                // error = {this.state.error}
                buttonText: 'create account' })));
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
    return (React.createElement("button", { className: currentClass }, props.buttonText));
}
exports.default = FormWrapper;
//# sourceMappingURL=form-wrapper.js.map