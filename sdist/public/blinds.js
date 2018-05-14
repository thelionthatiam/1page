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
        _this.state = {
            active: false,
            blinds: _this.props.albums
        };
        _this.handleClick = _this.handleClick.bind(_this);
        _this.revert = _this.revert.bind(_this);
        return _this;
    }
    Blinds.prototype.componentWillMount = function () {
        this.props.getPhotos();
    };
    Blinds.prototype.handleClick = function (id, e) {
        var _this = this;
        e.preventDefault();
        var currentState = this.state.active;
        this.setState({
            active: !currentState,
        }, function () {
            console.log(_this.state.active);
            _this.props.toggleBlinds(id, _this.state.active);
        });
    };
    Blinds.prototype.revert = function (e) {
        var _this = this;
        e.preventDefault();
        this.setState({
            active: false
        }, function () {
            _this.props.toggleBlinds(null, _this.state.active);
        });
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
            if (_this.props.albums.length !== 0 && !_this.state.active) {
                // console.log('id check', data.id)
                return (React.createElement(Blind, { key: data.id, number: data.id, active: _this.state.active, selected: data.selected, content: data.title, description: data.description, onClick: function (e) { return _this.handleClick(data.id, e); } }));
            }
            else if (_this.props.albums.length !== 0 && _this.state.active && data.selected) {
                return (React.createElement(Blind, { key: data.id, number: data.id, active: _this.state.active, selected: data.selected, content: data.title, description: data.description, onClick: function (e) { return _this.handleClick(data.id, e); } }));
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
        var baseStyle = "wrapper";
        this.props.number % 2 === 0
            ? (baseStyle = "wrapper")
            : (baseStyle = "wrapper-flip");
        // let activeStyle = null;
        // if (this.props.active) {
        //     this.props.selected ? activeStyle = this.state.selected : activeStyle = this.state.off;
        // }            
        console.log('active', this.props.active, 'selected', this.props.selected);
        return (React.createElement("div", null,
            React.createElement("div", { className: baseStyle, 
                // style = { activeStyle }
                onClick: this.props.onClick },
                React.createElement("div", { className: 'album-title-wrapper' },
                    React.createElement("p", { className: 'album-title' }, this.props.content)))));
    };
    return Blind;
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