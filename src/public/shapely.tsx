import * as React from 'react';
import { 
    HomeOne,
    HomeTwo,
    HomeThree,
    HomeFour,
    HomeFive,
    HomeSix,
    HomeSeven,
    HomeEight,
    // HomeNine
 } from './svg/icons'

function generateCircleObjs(num) {
    let circles = [] //
    for (let i = 0; i < num; i++) {
        circles.push({
            top: Math.random() * 100,
            left: Math.random() * 100,
            speed: Math.random(),
            dimension: Math.random() * 100 + 50,
            color: '#' + Math.random().toString(16).slice(-6)
        })
    }
    return circles
}
//

let randomDimension = () => Math.random() * 300 + 500

export default class Shapely extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            x: 0,
            y: 0
        }
        this.rawShapes = [
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed:Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape:HomeTwo
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape:HomeThree
                //french fry

            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: HomeFour
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: HomeFive
                // nugget
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: HomeSix
            },
            
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: HomeOne
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: HomeEight
                //string
            },
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed: Math.random(),
                dimension: randomDimension(),
                color: '#' + Math.random().toString(16).slice(-6),
                shape: HomeSeven
                //staircase
            },
        ]
    }

    _onMouseMove(e) {
        let clientW = document.getElementById("root").clientWidth
        let clientH = document.getElementById("root").offsetHeight
        let width = (((clientW + e.clientX) / clientW) - 1) * 100;
        let height = (((clientH + e.clientY) / clientH) - 1) * 100;
        this.setState({
            x: width,
            y: height
        })
    }

    distance(circle) {
        let clientH = document.getElementById("root").offsetHeight
        let height = (((clientH + circle.dimension) / clientH) - 1) * 100;

        let clientW = document.getElementById("root").clientWidth
        let width = (((clientW + circle.dimension) / clientW) - 1) * 100;

        let magY = (circle.top + (height / 2) - this.state.y)
        let magX = (circle.left + (width / 2) - this.state.x)
        return {
            mag: Math.sqrt(Math.pow(Math.abs(magY), 2) + Math.pow(magX, 2)),
            magY: magY,
            magX: magX
        }
    }

    render() {
        let circles = this.rawShapes.map((circle, index) => {
            let distance = this.distance(circle)
            let top = parseFloat(circle.top) + '%';
            let left = parseFloat(circle.left) + '%';

            if (distance.mag < 20 && distance.mag !== 0) {
                if (distance.magY <= 0) {
                    let h = Math.pow((distance.magY + 10), 2) - 98
                    top = parseFloat(circle.top + h / 100) + '%';
                } else {
                    let h = Math.pow((distance.magY - 10), 2) - 98
                    top = parseFloat(circle.top - h / 100) + '%';
                }

                if (distance.magX <= 0) {
                    let w = Math.pow((distance.magX + 10), 2) - 99
                    left = parseFloat(circle.left + w / 100) + '%';
                } else {
                    let w = Math.pow((distance.magX - 10), 2) - 99
                    left = parseFloat(circle.left - w / 100) + '%';
                }
            }

            return (<Circle
                key={index}
                name={circle}
                speed={circle.speed}
                top={top}
                left={left}
                color={circle.color}
                dimension={circle.dimension}
                shape = {circle.shape}
            />)
        })

        return (
            <div 
                className="shapely-wrapper"
                onMouseMove={this._onMouseMove.bind(this)}
            >
                {circles}
            </div>
        )
    }
}

class Circle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            speed: this.props.speed || 1,
            top: this.props.top || '0%',
            left: this.props.left,
            right: this.props.right,
            position: 'absolute',
            zIndex: this.props.index || '0',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'transparent',
            backgroundImage: `url(${this.props.image})`,
            borderRadius: '0',
            border: 'transparent',
            transition: '200ms',
            stroke:'papayawhip',
            // transform:`translate(${-this.props.dimension/2}, ${-this.props.dimension/2})`
        }
        // this.handleScroll = this.throttle(this.handleScroll.bind(this), 10)
        this.top = this.getTop()
    }

    throttle(fn, wait) {
        let time = Date.now()
        return function () {
            if ((time + wait - Date.now()) < 0) {
                fn()
                time = Date.now()
            }
        }
    }

    // componentDidMount() {
    //     window.addEventListener('scroll', this.handleScroll)
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll)
    // }

    componentWillReceiveProps(props) {
        this.setState({
            top: props.top,
            left: props.left
        })
    }

    getTop() {
        const top = this.props.top;

        return top.indexOf('%') > -1 ?
            window.innerHeight * (top.replace('%', '') / 100) :
            parseInt(top, 10)
    }

    // handleScroll() {
    //     const speed = this.props.speed;
    //     const top = this.top;
    //     const pageTop = window.scrollY
    //     const newTop = (top - (pageTop * speed))
    //     this.refs.parallaxElement.style.top = `${newTop}px`
    // }

    render() {
        let Shape = this.props.shape
        return (
            <Shape
                styles = 'svg-icon'
                style={this.state}
                width={this.props.dimension}
                height={this.props.dimension}
            />
        )
    }
}

// {
//     top: 35,
//         left: 5,
//             speed: Math.random(),
//                 dimension: 300,
//                     color: '#' + Math.random().toString(16).slice(-6),
//                         shape: HomeTwo
// },
// {
//     top: 30,
//         left: 4,
//             speed: Math.random(),
//                 dimension: 380,
//                     color: '#' + Math.random().toString(16).slice(-6),
//                         shape: HomeThree
//     //french fry

// },
// {
//     top: 55,
//         left: 20,
//             speed: Math.random(),
//                 dimension: 250,
//                     color: '#' + Math.random().toString(16).slice(-6),
//                         shape: HomeFour
// },
// {
//     top: 14,
//         left: 50,
//             speed: Math.random(),
//                 dimension: 300,
//                     color: '#' + Math.random().toString(16).slice(-6),
//                         shape: HomeFive
//     // nugget
// },
// {
//     top: 30,
//         left: 55,
//             speed: Math.random(),
//                 dimension: 320,
//                     color: '#' + Math.random().toString(16).slice(-6),
//                         shape: HomeSix
// },

// {
//     top: 45,
//         left: 29,
//             speed: Math.random(),
//                 dimension: 500,
//                     color: '#' + Math.random().toString(16).slice(-6),
//                         shape: HomeOne
// },
// {
//     top: 10,
//         left: 3,
//             speed: Math.random(),
//                 dimension: 1000,
//                     color: '#' + Math.random().toString(16).slice(-6),
//                         shape: HomeEight
//     //string
// },
// {
//     top: 15,
//         left: 17,
//             speed: Math.random(),
//                 dimension: 320,
//                     color: '#' + Math.random().toString(16).slice(-6),
//                         shape: HomeSeven
//     //staircase
// },