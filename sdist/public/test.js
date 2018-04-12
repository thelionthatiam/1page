"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var user_data_1 = require("./actions/user-data");
var Test = function (_a) {
    var userData = _a.userData, populate = _a.populate;
    console.log('~~~~~~~~~~~~~~~~~~~~ 7. test component', userData, populate);
    return (React.createElement("div", null,
        React.createElement("h1", null, "profile"),
        React.createElement("p", null, userData.profile.name),
        React.createElement("p", null, userData.profile.email),
        React.createElement("p", null, userData.profile.phone),
        React.createElement("p", null, userData.profile.permission),
        React.createElement("h1", null, "alarms"),
        React.createElement("h4", null, userData.alarms[0].title),
        React.createElement("p", null, userData.alarms[0].time),
        React.createElement("p", null, userData.alarms[0].user_uuid),
        React.createElement("p", null, userData.alarms[0].state),
        React.createElement("p", null, userData.alarms[0].repeat),
        React.createElement("button", { onClick: populate, className: 'button dark-button' }, "get user data")));
};
var mapStateToProps = function (state) {
    console.log(' ~~~~~~~~~~~~~~~~~~~~ 4. map state to prop', state);
    return {
        userData: state.userData
    };
};
var mapDispatchToProps = function (dispatch) {
    console.log('~~~~~~~~~~~~~~~~~~~~ 6. map dispatch', user_data_1.populate);
    return {
        populate: function (userData) { return dispatch(user_data_1.populate(userData)); }
    };
};
var TestApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Test);
exports.TestApp = TestApp;
// class Tester extends React.Component {
//     user: any;
//     props: any;
//     constructor(props) {
//         super(props)
//         this.user = this.props.userData
//     }
//     render() {
//         console.log(this.props)
//         return(
//             <div>
//                 <p>this is a test that originates fasdg;lkajndkg a little sauce</p>
//                 <div><pre>{JSON.stringify(this.user, null, 2) }</pre></div>
//             </div>
//         )
//     }
// }
// <div><pre>{JSON.stringify({userData}, null, 2)}</pre></div> 
//# sourceMappingURL=test.js.map