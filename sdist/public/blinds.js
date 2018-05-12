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
var data = [
    {
        id: 1,
        content: "a",
        selected: false
    },
    {
        id: 2,
        content: "b",
        selected: false
    },
    {
        id: 3,
        content: "c",
        selected: false
    },
    {
        id: 4,
        content: "d",
        selected: false
    },
    {
        id: 5,
        content: "e",
        selected: false
    }
];
var Blinds = /** @class */ (function (_super) {
    __extends(Blinds, _super);
    function Blinds(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            blinds: data,
            active: false
        };
        _this.handleClick = _this.handleClick.bind(_this);
        _this.revert = _this.revert.bind(_this);
        return _this;
    }
    Blinds.prototype.handleClick = function (id, e) {
        var _this = this;
        e.preventDefault();
        console.log('clicked');
        var freeze = this.state.blinds;
        for (var i = 0; i < freeze.length; i++) {
            for (var k in freeze[i]) {
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
            console.log(_this.state.blinds, 'handleclick callback');
            _this.props.toggleBlinds(_this.state.active);
        });
    };
    Blinds.prototype.revert = function (e) {
        e.preventDefault();
        this.setState({
            blinds: [
                {
                    id: 1,
                    content: "a",
                    selected: false
                },
                {
                    id: 2,
                    content: "b",
                    selected: false
                },
                {
                    id: 3,
                    content: "c",
                    selected: false
                },
                {
                    id: 4,
                    content: "d",
                    selected: false
                },
                {
                    id: 5,
                    content: "e",
                    selected: false
                }
            ],
            active: false
        });
    };
    Blinds.prototype.render = function () {
        var _this = this;
        console.log('blinds', this.props);
        var blinds = this.state.blinds.map(function (data) {
            return (React.createElement(Blind, { key: data.id, number: data.id, active: _this.state.active, selected: data.selected, content: data.content, onClick: function (e) { return _this.handleClick(data.id, e); } }));
        });
        return (React.createElement("div", { className: "page-wrapper" },
            blinds,
            React.createElement("button", { onClick: this.revert }, " revert ")));
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
            console.log('render props active');
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
        blinds: state.all.blinds // this data structure needs to happen
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        toggleBlinds: function (isOpen) { return dispatch(actions_1.toggleBlinds(isOpen)); }
    };
};
var BlindsAction = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Blinds);
exports.default = BlindsAction;
//# sourceMappingURL=blinds.js.map