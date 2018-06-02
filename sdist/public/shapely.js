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
function generateCircleObjs(num) {
    var circles = []; //
    for (var i = 0; i < num; i++) {
        circles.push({
            top: Math.random() * 100,
            left: Math.random() * 100,
            speed: Math.random(),
            dimension: Math.random() * 100 + 50,
            color: '#' + Math.random().toString(16).slice(-6)
        });
    }
    return circles;
}
//
var randomDimension = function () { return Math.random() * 300 + 500; };
var Shapely = /** @class */ (function (_super) {
    __extends(Shapely, _super);
    function Shapely(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            x: 0,
            y: 0
        };
        _this.rawShapes = [
            {
                top: 10,
                left: 10,
                speed: Math.random(),
                dimension: 300,
                color: '#' + Math.random().toString(16).slice(-6),
                shape: icons_1.HomeTwo
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: icons_1.HomeThree
                //french fry
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: icons_1.HomeFour
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: icons_1.HomeFive
                // nugget
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: icons_1.HomeSix
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: icons_1.HomeOne
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: icons_1.HomeEight
                //string
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: icons_1.HomeSeven
                //staircase
            },
        ];
        return _this;
    }
    Shapely.prototype.componentDidMount = function () {
        document.querySelector('body').classList.add('body');
    };
    Shapely.prototype.componentWillUnmount = function () {
        document.querySelector('body').classList.remove('body');
    };
    Shapely.prototype._onMouseMove = function (e) {
        // let clientW = document.getElementById("root").offsetWidth
        // let clientH = document.getElementById("root").offsetHeight
        var clientW = document.body.clientWidth;
        var clientH = document.body.clientHeight;
        console.log('document width', clientW, 'document height', clientH);
        console.log('eclientx', e.clientX, 'eclientY', e.clientY);
        var width = (((clientW + e.clientX) / clientW) - 1) * 100;
        var height = (((clientH + e.clientY) / clientH) - 1) * 100;
        this.setState({
            x: width,
            y: height
        }
        //,() => {console.log('mouse pos x', this.state.x, 'mouse pos y', this.state.y)}
        );
    };
    Shapely.prototype.distance = function (circle) {
        var clientH = document.getElementById("root").offsetHeight;
        var height = (((clientH + circle.dimension) / clientH) - 1) * 100;
        var clientW = document.getElementById("root").clientWidth;
        var width = (((clientW + circle.dimension) / clientW) - 1) * 100;
        var magY = (circle.top + (height / 2) - this.state.y);
        var magX = (circle.left + (width / 2) - this.state.x);
        return {
            mag: Math.sqrt(Math.pow(Math.abs(magY), 2) + Math.pow(magX, 2)),
            magY: magY,
            magX: magX
        };
    };
    Shapely.prototype.render = function () {
        var _this = this;
        var shapes = this.rawShapes.map(function (shape, index) {
            var distance = _this.distance(shape);
            var top = parseFloat(shape.top) + '%';
            var left = parseFloat(shape.left) + '%';
            var radius = 30;
            if (distance.mag < radius && distance.mag !== 0) {
                if (distance.magY <= 0) {
                    var h = Math.pow((distance.magY + (radius / 2)), 2) - (radius * 5);
                    top = parseFloat(shape.top + h / 100) + '%';
                }
                else {
                    var h = Math.pow((distance.magY - (radius / 2)), 2) - (radius * 5);
                    top = parseFloat(shape.top - h / 100) + '%';
                }
                if (distance.magX <= 0) {
                    var w = Math.pow((distance.magX + radius / 2), 2) - (radius * 5);
                    left = parseFloat(shape.left + w / 100) + '%';
                }
                else {
                    var w = Math.pow((distance.magX - radius / 2), 2) - (radius * 5);
                    left = parseFloat(shape.left - w / 100) + '%';
                }
            }
            return (React.createElement(Circle, { key: index, name: shape, speed: shape.speed, top: top, left: left, color: shape.color, dimension: shape.dimension, shape: shape.shape }));
        });
        return (React.createElement("div", { className: "shapely-wrapper", onMouseMove: this._onMouseMove.bind(this) }, shapes));
    };
    return Shapely;
}(React.Component));
exports.default = Shapely;
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            speed: _this.props.speed || 1,
            top: _this.props.top || '0%',
            left: _this.props.left,
            right: _this.props.right,
            position: 'absolute',
            zIndex: _this.props.index || '0',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'transparent',
            //border: "5px solid white",
            backgroundImage: "url(" + _this.props.image + ")",
            borderRadius: '0',
            transition: '200ms',
            stroke: 'black',
        };
        // this.handleScroll = this.throttle(this.handleScroll.bind(this), 10)
        _this.top = _this.getTop();
        return _this;
    }
    Circle.prototype.throttle = function (fn, wait) {
        var time = Date.now();
        return function () {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        };
    };
    // componentDidMount() {
    //     window.addEventListener('scroll', this.handleScroll)
    // }
    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll)
    // }
    Circle.prototype.componentWillReceiveProps = function (props) {
        this.setState({
            top: props.top,
            left: props.left
        });
    };
    Circle.prototype.getTop = function () {
        var top = this.props.top;
        return top.indexOf('%') > -1 ?
            window.innerHeight * (top.replace('%', '') / 100) :
            parseInt(top, 10);
    };
    // handleScroll() {
    //     const speed = this.props.speed;
    //     const top = this.top;
    //     const pageTop = window.scrollY
    //     const newTop = (top - (pageTop * speed))
    //     this.refs.parallaxElement.style.top = `${newTop}px`
    // }
    Circle.prototype.render = function () {
        var Shape = this.props.shape;
        return (React.createElement(Shape, { styles: 'svg-icon', style: this.state, width: this.props.dimension, height: this.props.dimension }));
    };
    return Circle;
}(React.Component));
//# sourceMappingURL=shapely.js.map