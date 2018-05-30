"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var actions_1 = require("./actions");
var mapStateToProps = function (state) {
    return {
        blinds: state.all.blinds,
        albums: state.all.albums
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        toggleBlinds: function (id, isOpen) { return dispatch(actions_1.toggleBlinds(id, isOpen)); },
        getPhotos: function () { return dispatch(actions_1.fetchPhotos()); }
    };
};
var BlindsAction = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Blinds);
exports.default = BlindsAction;
//# sourceMappingURL=home.js.map