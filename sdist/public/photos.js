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
var Transition_1 = require("react-transition-group/Transition");
var react_redux_1 = require("react-redux");
var actions_1 = require("./actions");
var PhotoContainer = /** @class */ (function (_super) {
    __extends(PhotoContainer, _super);
    function PhotoContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.componentDidMount = _this.componentDidMount.bind(_this);
        return _this;
    }
    PhotoContainer.prototype.componentDidMount = function () {
        this.props.getPhotos();
    };
    PhotoContainer.prototype.render = function () {
        var duration = 200;
        var transitionStyles = {
            entering: {
                opacity: 0,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            entered: {
                opacity: 1,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            exiting: {
                opacity: .8,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            exited: {
                opacity: 0,
                transition: "opacity " + duration + "ms ease-in-out",
            }
        };
        var items = React.createElement("h1", null, "nothing here yet!");
        if (this.props.albums.length !== 0) {
            items = this.props.albums.map(function (item) {
                return React.createElement("div", { key: item.id, title: item.title },
                    React.createElement("p", null, item.title),
                    React.createElement("p", null, item.date),
                    React.createElement("p", null, item.description),
                    React.createElement("p", null, item.album_uuid),
                    item.photos.length > 0 ?
                        item.photos.map(function (item) {
                            return React.createElement("div", { key: item.id },
                                React.createElement("p", null, item.photo),
                                React.createElement("img", { src: "/imgs/" + item.photo + ".jpg" }));
                        }) :
                        null,
                    ";");
            });
        }
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("h1", null, "hello photo world"),
                React.createElement("form", { action: '/photos', method: "get" },
                    React.createElement("button", { type: "submit" }, "get photos"))),
            React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true }, function (state) {
                return React.createElement("div", { style: transitionStyles[state] }, items);
            })));
    };
    return PhotoContainer;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        albums: state.all.albums // this data structure needs to happen
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        getPhotos: function () { return dispatch(actions_1.fetchPhotos()); }
    };
};
var Photos = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PhotoContainer);
exports.default = Photos;
//# sourceMappingURL=photos.js.map