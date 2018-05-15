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
var Blinds = /** @class */ (function (_super) {
    __extends(Blinds, _super);
    function Blinds(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    Blinds.prototype.componentWillMount = function () {
        this.props.getPhotos();
    };
    Blinds.prototype.handleClick = function (id, e) {
        e.preventDefault();
        var selectedAlbum = this.props.albums.filter(function (album) { return album.selected; });
        if (selectedAlbum.length !== 0) {
            if (selectedAlbum[0].id === id) {
                this.props.toggleBlinds(id, false);
            }
            else {
                this.props.toggleBlinds(id, true);
            }
        }
        else {
            this.props.toggleBlinds(id, true);
        }
    };
    Blinds.prototype.findCurrentSelection = function () {
        var selectedAlbum = this.props.albums.filter(function (album) { return album.selected; });
    };
    Blinds.prototype.render = function () {
        var _this = this;
        var duration = 400;
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
        var blinds = this.props.albums.map(function (data) {
            if (_this.props.albums.length !== 0) {
                var blindStyle = "wrapper";
                var photoWrapperStyle = 'album-wrapper';
                if (data.id % 2 === 0) {
                    blindStyle = "wrapper";
                    photoWrapperStyle = 'album-wrapper';
                }
                else {
                    blindStyle = "wrapper-flip";
                    photoWrapperStyle = 'album-wrapper-flip';
                }
                return (React.createElement("div", { key: data.id },
                    React.createElement(Blind, { style: blindStyle, selected: data.selected, content: data.title, description: data.description, onClick: function (e) { return _this.handleClick(data.id, e); } }),
                    React.createElement(PhotoContainer, { style: photoWrapperStyle, album: data, selected: data.selected })));
            }
        });
        return (React.createElement("div", { className: "page-wrapper" },
            React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true, componentWillLeave: this.componentWillLeave }, function (state) {
                return React.createElement("div", { style: transitionStyles[state] }, blinds);
            })));
    };
    return Blinds;
}(React.Component));
var Blind = /** @class */ (function (_super) {
    __extends(Blind, _super);
    function Blind(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            off: {
                opacity: "0",
                transition: "200ms",
                height: "15px"
            },
            selected: {
                transition: "200ms",
                top: "0"
            },
        };
        return _this;
    }
    Blind.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: this.props.style, onClick: this.props.onClick },
                React.createElement("div", { className: 'album-title-wrapper' },
                    React.createElement("p", { className: 'album-title' }, this.props.content)))));
    };
    return Blind;
}(React.Component));
var PhotoContainer = /** @class */ (function (_super) {
    __extends(PhotoContainer, _super);
    function PhotoContainer(props) {
        return _super.call(this, props) || this;
    }
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
        var items = React.createElement("h1", null);
        if (this.props.album.length !== 0 && this.props.selected) {
            var style_1 = {
                marginTop: "15px",
                marginBottom: "15px"
            };
            items = this.props.album.photos.map(function (photo) {
                return React.createElement("div", { key: photo.id, style: style_1 },
                    React.createElement("img", { className: 'img', src: "/imgs/" + photo.src + ".jpg" }));
            });
        }
        return (React.createElement("div", { className: this.props.style },
            React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true }, function (state) {
                return React.createElement("div", { style: transitionStyles[state] }, items);
            })));
    };
    return PhotoContainer;
}(React.Component));
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
//# sourceMappingURL=blinds.js.map