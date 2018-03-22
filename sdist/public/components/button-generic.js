"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Button(props) {
    var currentClass = 'yes';
    if (!props.submitable) {
        currentClass = 'buttonInactive';
    }
    if (props.submitted) {
        currentClass = 'buttonSuccess';
    }
    return (React.createElement("button", { className: currentClass }, props.buttonText));
}
exports.default = Button;
//# sourceMappingURL=button-generic.js.map