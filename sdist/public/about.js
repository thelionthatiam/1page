"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
function About(props) {
    return (React.createElement("div", { className: "about" }));
}
exports.About = About;
function Photo(props) {
}
exports.Photo = Photo;
function DotToggle(props) {
    if (props.open)
        return React.createElement("div", { className: 'small-dot' });
    else
        return React.createElement("div", { className: 'no-dot' });
}
exports.DotToggle = DotToggle;
//# sourceMappingURL=about.js.map