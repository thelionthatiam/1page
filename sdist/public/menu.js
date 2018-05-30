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
var dial_menu_1 = require("./dial-menu");
var icons_1 = require("./svg/icons");
var HamburgerMenu = /** @class */ (function (_super) {
    __extends(HamburgerMenu, _super);
    function HamburgerMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isClosed: true,
            risClosed: true
        };
        _this.openMenu = _this.openMenu.bind(_this);
        _this.rightOpenMenu = _this.rightOpenMenu.bind(_this);
        _this.scrollLock = _this.scrollLock.bind(_this);
        return _this;
    }
    HamburgerMenu.prototype.openMenu = function (e) {
        var _this = this;
        e.preventDefault();
        this.setState({
            isClosed: !this.state.isClosed
        }, function () {
            if (_this.state.isClosed) {
                _this.setState({
                    risClosed: true
                });
                _this.scrollUnlock();
            }
            else {
                _this.scrollLock();
            }
        });
    };
    HamburgerMenu.prototype.rightOpenMenu = function (e) {
        e.preventDefault();
        this.setState({
            risClosed: !this.state.risClosed
        });
    };
    HamburgerMenu.prototype.scrollLock = function () {
        document.body.classList.add('scroll-lock');
    };
    HamburgerMenu.prototype.scrollUnlock = function () {
        document.body.classList.remove('scroll-lock');
    };
    HamburgerMenu.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: this.state.isClosed ? null : "curtain", onClick: this.openMenu }),
            React.createElement(icons_1.Hamburger, { openMenu: this.openMenu, class: this.state.isClosed
                    ?
                        "menu-svg"
                    :
                        "menu-svg open" }),
            React.createElement("div", { className: this.state.isClosed
                    ?
                        'left-menu-wrapper'
                    :
                        'left-menu-wrapper menu-open' },
                React.createElement("div", { className: 'menu-icons-wrapper' },
                    React.createElement(icons_1.Home, { class: "menu-icons current-menu-icon" }),
                    React.createElement(icons_1.Repository, { class: "menu-icons", onClick: this.rightOpenMenu }),
                    React.createElement(icons_1.About, { class: "menu-icons" }),
                    React.createElement(icons_1.CurrentWork, { class: "menu-icons skinny-stroke" }))),
            React.createElement("div", { className: this.state.risClosed
                    ?
                        'right-menu-wrapper'
                    :
                        'right-menu-wrapper menu-open' },
                React.createElement(dial_menu_1.default, null))));
    };
    return HamburgerMenu;
}(React.Component));
exports.default = HamburgerMenu;
//# sourceMappingURL=menu.js.map