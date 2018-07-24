"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const actions_1 = require("./actions");
const mapStateToProps = state => {
    return {
        blinds: state.all.blinds,
        albums: state.all.albums
    };
};
const mapDispatchToProps = dispatch => {
    return {
        toggleBlinds: (id, isOpen) => dispatch(actions_1.toggleBlinds(id, isOpen)),
        getPhotos: () => dispatch(actions_1.fetchPhotos())
    };
};
const BlindsAction = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Blinds);
exports.default = BlindsAction;
//# sourceMappingURL=home.js.map