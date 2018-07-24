"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const dial_menu_1 = require("./dial-menu");
const icons_1 = require("./svg/icons");
class HamburgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isClosed: true,
            risClosed: true
        };
        this.openMenu = this.openMenu.bind(this);
        this.rightOpenMenu = this.rightOpenMenu.bind(this);
        this.scrollLock = this.scrollLock.bind(this);
    }
    openMenu(e) {
        e.preventDefault();
        this.setState({
            isClosed: !this.state.isClosed
        }, () => {
            if (this.state.isClosed) {
                this.setState({
                    risClosed: true
                });
                this.scrollUnlock();
            }
            else {
                this.scrollLock();
            }
        });
    }
    rightOpenMenu(e) {
        e.preventDefault();
        this.setState({
            risClosed: !this.state.risClosed
        });
    }
    scrollLock() {
        document.body.classList.add('scroll-lock');
    }
    scrollUnlock() {
        document.body.classList.remove('scroll-lock');
    }
    render() {
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
                    React.createElement("a", { href: '/about' },
                        React.createElement(icons_1.About, { class: "menu-icons" })))),
            React.createElement("div", { className: this.state.risClosed
                    ?
                        'right-menu-wrapper'
                    :
                        'right-menu-wrapper menu-open' },
                React.createElement(dial_menu_1.default, null))));
    }
}
exports.default = HamburgerMenu;
//# sourceMappingURL=menu.js.map