"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_responsive_embed_1 = require("react-responsive-embed");
const react_redux_1 = require("react-redux");
class NewTest extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", null,
            React.createElement("h1", null, "hello react world"),
            React.createElement("div", { style: { width: '50vw' } },
                React.createElement(react_responsive_embed_1.default, { src: 'https://www.youtube.com/embed/2yqz9zgoC-U', allowFullScreen: true }))));
    }
}
const mapStateToProps = state => {
};
const mapDispatchToProps = dispatch => {
};
const TestApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NewTest);
exports.TestApp = TestApp;
//# sourceMappingURL=test.js.map