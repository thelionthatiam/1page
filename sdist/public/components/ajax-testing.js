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
var node_fetch_1 = require("node-fetch");
var PersonList = /** @class */ (function (_super) {
    __extends(PersonList, _super);
    function PersonList(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            increment: 0,
            persons: []
        };
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    PersonList.prototype.fetcher = function (count) {
        var _this = this;
        node_fetch_1.default('https://jsonplaceholder.typicode.com/users')
            .then(function (res) { return res.json(); })
            .then(function (json) {
            console.log(json[count]);
            if (count === 0) {
                console.log('count is 0');
                _this.setState({
                    persons: [json[count]],
                    increment: (count + 1)
                });
            }
            else {
                console.log('count is non0');
                var currentPeople = _this.state.persons;
                currentPeople.push(json[count]);
                _this.setState({
                    persons: currentPeople,
                    increment: (count + 1)
                });
            }
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    PersonList.prototype.componentDidMount = function () {
        this.fetcher(0);
    };
    PersonList.prototype.handleClick = function () {
        this.fetcher(this.state.increment);
    };
    PersonList.prototype.render = function () {
        console.log('increment', this.state.increment);
        return (React.createElement("div", null,
            React.createElement(Button, { onClick: this.handleClick }),
            React.createElement("ul", null, this.state.persons.map(function (person) {
                return React.createElement("li", null, person.name + '--aka--' + person.username);
            }))));
    };
    return PersonList;
}(React.Component));
function Button(props) {
    return (React.createElement("button", { onClick: props.onClick }, "add a user"));
}
exports.default = PersonList;
//# sourceMappingURL=ajax-testing.js.map