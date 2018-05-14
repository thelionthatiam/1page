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
    Blinds.prototype.addSateToAlbums = function () {
        console.log('BLINDS ALBMUMS DATA', this.props.albums);
        if (this.props.albums.length !== 0) {
            for (var i = 0; i < this.props.albums.length; i++) {
                this.props.albums[i].selected = false;
            }
        }
    };
    Blinds.prototype.handleClick = function (id, e) {
        var _this = this;
        e.preventDefault();
        console.log('id check two ||||||', id);
        var freeze = this.props.albums;
        for (var i = 0; i < freeze.length; i++) {
            for (var k in freeze[i]) {
                console.log('id check three ||||', freeze[i].id, id);
                if (freeze[i].id !== id) {
                    freeze[i].selected = false;
                }
                else {
                    freeze[i].selected = true;
                }
            }
        }
        this.setState({
            active: true,
            blinds: freeze
        }, function () {
            _this.props.toggleBlinds(_this.state.active);
        });
    };
    Blinds.prototype.revert = function (e) {
        var _this = this;
        e.preventDefault();
        this.setState({
            active: false
        }, function () {
            _this.props.toggleBlinds(_this.state.active);
        });
    };
    Blinds.prototype.render = function () {
        var _this = this;
        // this.addSateToAlbums()
        var blinds = this.props.albums.map(function (data) {
            if (_this.props.albums.length !== 0) {
                // console.log('id check', data.id)
                return (React.createElement(Blind, { key: data.id, number: data.id, active: _this.state.active, selected: data.selected, content: data.title, onClick: function (e) { return _this.handleClick(data.id, e); } }));
            }
        });
        return (React.createElement("div", { className: "page-wrapper" },
            blinds,
            React.createElement("button", { className: 'revert-button', onClick: this.revert }, " revert ")));
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
                transition: "1000ms",
                height: "0px",
                fontSize: '0px'
            },
            selected: {
                transition: "1000ms",
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
        var activeStyle = null;
        if (this.props.active) {
            this.props.selected ? activeStyle = this.state.selected : activeStyle = this.state.off;
        }
        return (React.createElement("div", { className: baseStyle, style: activeStyle, onClick: this.props.onClick },
            React.createElement("h1", null,
                this.props.content,
                " ")));
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
        toggleBlinds: function (isOpen) { return dispatch(actions_1.toggleBlinds(isOpen)); },
        getPhotos: function () { return dispatch(actions_1.fetchPhotos()); }
    };
};
var BlindsAction = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Blinds);
exports.default = BlindsAction;
//# sourceMappingURL=blinds.js.map