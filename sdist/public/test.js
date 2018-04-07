"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var user_data_1 = require("./actions/user-data");
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
var Test = function (_a) {
    var userData = _a.userData, populate = _a.populate;
    console.log('test component', userData, populate);
    return (React.createElement("div", null,
        React.createElement("p", null, "THIS IS A TEST TO SEE IF STATE CAN COME FROM REDUX"),
        React.createElement("p", null, userData),
        React.createElement("button", { onClick: populate }, "get user data")));
};
var mapStateToProps = function (state) {
    console.log('map state to porps');
    return {
        userData: state.populateUserData.userData
    };
};
var mapDispatchToProps = function (dispatch) {
    console.log('map dispatch');
    return {
        populate: function () { return dispatch(user_data_1.populate()); }
    };
};
var TestApp = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Test);
exports.TestApp = TestApp;
//# sourceMappingURL=test.js.map