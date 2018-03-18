"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
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
exports.default = PasswordQuality;
//# sourceMappingURL=password-quality.js.map