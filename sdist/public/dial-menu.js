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
var icons_1 = require("./svg/icons");
var Dial = /** @class */ (function (_super) {
    __extends(Dial, _super);
    function Dial(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            position: 0,
            items: [
                {
                    position: 0,
                    selected: true,
                    title: 'photo',
                    class: 'di1 item',
                    icon: icons_1.PhotoIcon,
                    link: '/photo'
                },
                {
                    position: 1,
                    selected: false,
                    title: 'video',
                    class: 'di2 item',
                    icon: icons_1.VideoIcon,
                    link: '/photo'
                },
                {
                    position: 2,
                    selected: false,
                    title: 'whatever',
                    class: 'di3 item',
                    icon: icons_1.CrowdIcon,
                    link: '/photo'
                },
                {
                    position: 3,
                    selected: false,
                    title: 'asdf',
                    class: 'di4 item',
                    icon: icons_1.DeltaIcon,
                    link: '/photo'
                },
                {
                    position: 4,
                    selected: false,
                    title: 'ldsfga;',
                    class: 'di5 item',
                    icon: icons_1.MovementIcon,
                    link: '/photo'
                },
                {
                    position: 5,
                    selected: false,
                    title: '^_^',
                    class: 'di6 item',
                    icon: icons_1.ObjectsIcon,
                    link: '/photo'
                },
                {
                    position: 6,
                    selected: false,
                    title: '-_-',
                    class: 'di7 item',
                    icon: icons_1.ParallelIcon,
                    link: '/photo'
                },
                {
                    position: 7,
                    selected: false,
                    title: '0.o',
                    class: 'di8 item',
                    icon: icons_1.TieFighterIcon,
                    link: '/photo'
                }
            ],
            rotation: 0,
            scrollStatus: ''
        };
        _this.incriment = 360 / _this.state.items.length;
        _this.nextPosition = _this.nextPosition.bind(_this);
        _this.prevPosition = _this.prevPosition.bind(_this);
        _this.handleScroll = _this.handleScroll.bind(_this);
        _this._timeout = null;
        return _this;
    }
    Dial.prototype.componentDidMount = function () {
        window.addEventListener('wheel', this.handleScroll);
        this.setRotation();
    };
    Dial.prototype.componentWillUnmount = function () {
        window.removeEventListener('wheel', this.handleScroll);
    };
    Dial.prototype.handleScroll = function (event) {
        var _this = this;
        if (this._timeout) { //if there is already a timeout in process cancel it
            clearTimeout(this._timeout);
        }
        this._timeout = setTimeout(function () {
            _this._timeout = null;
            _this.setState({
                scrollStatus: 'scroll stopped'
            }, function () {
                var rotation = _this.state.rotation;
                // let rounds = Math.floor(rotation/360)
                // let absRotation = rotation - (rounds*360)
                var position = Math.round(8 * (rotation / 360));
                _this.setPosition(position);
            });
        }, 500);
        if (this.state.scrollStatus !== 'scrolling') {
            this.setState({
                scrollStatus: 'scrolling'
            });
        }
        if (event.deltaY > 0) {
            this.scrollPos();
        }
        else {
            this.scrollNeg();
        }
    };
    Dial.prototype.scrollPos = function () {
        this.setState({
            rotation: this.state.rotation + 1
        });
    };
    Dial.prototype.scrollNeg = function () {
        this.setState({
            rotation: this.state.rotation - 1
        });
    };
    Dial.prototype.setPosition = function (position) {
        var _this = this;
        console.log('sent pos', position);
        this.setState({
            position: position
        }, function () { return _this.setRotation(); });
    };
    Dial.prototype.nextPosition = function () {
        var _this = this;
        this.setState({
            position: this.state.position + 1
        }, function () { return _this.setRotation(); });
    };
    Dial.prototype.prevPosition = function () {
        var _this = this;
        this.setState({
            position: this.state.position - 1
        }, function () { return _this.setRotation(); });
    };
    Dial.prototype.setRotation = function () {
        var _this = this;
        this.setState({
            rotation: this.state.position * this.incriment
        }, function () {
            var updatedItems = [];
            var position = _this.state.position;
            for (var i = 0; i < _this.state.items.length; i++) {
                _this.state.items[i].selected = false;
                if (position >= 0) {
                    if (position === 0) {
                        _this.state.items[0].selected = true;
                    }
                    else if (_this.state.items[i].position !== Math.abs(position - 8)) {
                        _this.state.items[i].selected = false;
                    }
                    else if (_this.state.items[i].position === Math.abs(position - 8)) {
                        _this.state.items[i].selected = true;
                    }
                }
                else {
                    {
                        if (position === 0) {
                            _this.state.items[0].selected = true;
                        }
                        else if (_this.state.items[i].position !== Math.abs(position)) {
                            _this.state.items[i].selected = false;
                        }
                        else if (_this.state.items[i].position === Math.abs(position)) {
                            _this.state.items[i].selected = true;
                        }
                    }
                }
                updatedItems.push(_this.state.items[i]);
            }
            _this.setState({
                items: updatedItems
            });
        });
    };
    Dial.prototype.render = function () {
        var _this = this;
        var style = {
            transform: "rotate(" + this.state.rotation + "deg)"
        };
        var opStyle = {
            transform: "rotate(-" + this.state.rotation + "deg)"
        };
        if (this.state.rotation < 0) {
            opStyle = {
                transform: "rotate(" + Math.abs(this.state.rotation) + "deg)"
            };
        }
        var selected = this.state.items.filter(function (item) {
            // console.log('item', item)
            return item.selected === true;
        });
        var SelectedIcon = selected[0].icon;
        var showSelected = (React.createElement("div", { className: 'selected-repository' },
            React.createElement(SelectedIcon, { styles: 'r-menu-icons selected' }),
            React.createElement("a", { href: selected[0].link, className: 'r-menu-titles' }, selected[0].title)));
        return (React.createElement("div", { className: 'page-wrapper' },
            React.createElement("div", { className: 'r-menu-back' },
                React.createElement(icons_1.LeftArrow, { style: 'r-menu-back-icon' })),
            showSelected,
            React.createElement("div", { className: 'dial', style: style },
                this.state.items.map(function (item, index) {
                    var Icon = item.icon;
                    return (React.createElement("div", { className: item.class, style: opStyle, key: index, onClick: function () { return _this.setPosition(-1 * item.position); } },
                        React.createElement(Icon, { styles: item.selected ? 'r-menu-icons selected-mini' : 'r-menu-icons' })));
                }),
                React.createElement("div", { className: 'showDial' },
                    React.createElement(icons_1.Repository, { class: "menu-icons" }))),
            React.createElement("div", null,
                React.createElement("button", { onClick: this.prevPosition }, "prev"),
                React.createElement("button", { onClick: this.nextPosition }, "next"))));
    };
    return Dial;
}(React.Component));
exports.default = Dial;
//# sourceMappingURL=dial-menu.js.map