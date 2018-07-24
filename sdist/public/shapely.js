"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const icons_1 = require("./svg/icons");
function generateCircleObjs(num) {
    let circles = []; //
    for (let i = 0; i < num; i++) {
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
let randomDimension = () => Math.random() * 300 + 500;
class Shapely extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0
        };
        this.rawShapes = [
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
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
    }
    componentDidMount() {
        document.querySelector('body').classList.add('body');
    }
    componentWillUnmount() {
        document.querySelector('body').classList.remove('body');
    }
    _onMouseMove(e) {
        let clientW = document.body.clientWidth;
        let clientH = document.body.clientHeight;
        let width = (((clientW + e.clientX) / clientW) - 1) * 100;
        let height = (((clientH + e.clientY) / clientH) - 1) * 100;
        this.setState({
            x: width,
            y: height
        });
    }
    distance(circle) {
        let clientH = document.getElementById("root").offsetHeight;
        let height = (((clientH + circle.dimension) / clientH) - 1) * 100;
        let clientW = document.getElementById("root").clientWidth;
        let width = (((clientW + circle.dimension) / clientW) - 1) * 100;
        let magY = (circle.top + (height / 2) - this.state.y);
        let magX = (circle.left + (width / 2) - this.state.x);
        return {
            mag: Math.sqrt(Math.pow(Math.abs(magY), 2) + Math.pow(magX, 2)),
            magY: magY,
            magX: magX
        };
    }
    render() {
        let shapes = this.rawShapes.map((shape, index) => {
            let distance = this.distance(shape);
            let top = parseFloat(shape.top.toString()) + '%';
            let left = parseFloat(shape.left.toString()) + '%';
            let radius = 30;
            if (distance.mag < radius && distance.mag !== 0) {
                if (distance.magY <= 0) {
                    let h = Math.pow((distance.magY + (radius / 2)), 2) - (radius * 5);
                    top = parseFloat((shape.top + h / 100).toString()) + '%';
                }
                else {
                    let h = Math.pow((distance.magY - (radius / 2)), 2) - (radius * 5);
                    top = parseFloat((shape.top - h / 100).toString()) + '%';
                }
                if (distance.magX <= 0) {
                    let w = Math.pow((distance.magX + radius / 2), 2) - (radius * 5);
                    left = parseFloat((shape.left + w / 100).toString()) + '%';
                }
                else {
                    let w = Math.pow((distance.magX - radius / 2), 2) - (radius * 5);
                    left = parseFloat((shape.left - w / 100).toString()) + '%';
                }
            }
            return (React.createElement(Circle, { key: index, 
                //name= {shape}
                speed: shape.speed, top: top, left: left, color: shape.color, dimension: shape.dimension, shape: shape.shape, index: index }));
        });
        return (React.createElement("div", { className: "shapely-wrapper", onMouseMove: this._onMouseMove.bind(this) }, shapes));
    }
}
exports.default = Shapely;
class Circle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            speed: this.props.speed || 1,
            top: this.props.top || '0%',
            left: this.props.left,
            // right: this.props.right,
            position: 'absolute',
            zIndex: this.props.index || '0',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'transparent',
            // backgroundImage: `url(${this.props.image})`,
            borderRadius: '0',
            transition: '200ms',
        };
        this.top = this.getTop();
    }
    throttle(fn, wait) {
        let time = Date.now();
        return function () {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        };
    }
    componentWillReceiveProps(props) {
        this.setState({
            top: props.top,
            left: props.left
        });
    }
    getTop() {
        const top = this.props.top;
        return top.indexOf('%') > -1 ?
            window.innerHeight * (parseInt(top.replace('%', '')) / 100) :
            parseInt(top, 10);
    }
    render() {
        let Shape = this.props.shape;
        return (React.createElement(Shape, { styles: 'svg-icon', style: this.state, width: this.props.dimension, height: this.props.dimension }));
    }
}
//# sourceMappingURL=shapely.js.map