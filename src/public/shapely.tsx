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




let randomDimension = () => Math.random() * 300 + 500


export interface ShapeProps {
    styles: string;
    style: CircleProps;
    width: number
    height: number;
}

export interface Shapes {
    top : number;
    left : number;
    speed : number;
    dimension : number;
    color : string;
    shape : any; 
}

export interface ShapelyState {
    x:  number;
    y: number;
}

export default class Shapely extends React.Component {
    readonly rawShapes : Shapes[]

    constructor(props) {
        super(props)
        this.rawShapes = [
            {
                top: Math.random() * 100,
                left: Math.random() * 100,
                speed:Math.random(),
                dimension: 300,
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


    public readonly state: ShapelyState = {
        x: 0,
        y: 0
    }
    componentDidMount() {
        document.querySelector('body').classList.add('body');
    }
    
    componentWillUnmount () {
        document.querySelector('body').classList.remove('body');
    }

    _onMouseMove(e) {
        let clientW = document.body.clientWidth
        let clientH = document.body.clientHeight
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
        let shapes = this.rawShapes.map((shape, index) => {
            let distance = this.distance(shape)
            let top = parseFloat(shape.top.toString()) + '%';
            let left = parseFloat(shape.left.toString()) + '%';
            let radius = 30

            if (distance.mag < radius && distance.mag !== 0) {
                if (distance.magY <= 0) {
                    let h = Math.pow((distance.magY + (radius/2)), 2) - (radius*5)
                    top = parseFloat((shape.top + h / 100).toString()) + '%';
                } else {
                    let h = Math.pow((distance.magY - (radius/2)), 2) - (radius*5)
                    top = parseFloat((shape.top - h / 100).toString()) + '%';
                }

                if (distance.magX <= 0) {
                    let w = Math.pow((distance.magX + radius/2), 2) - (radius*5)
                    left = parseFloat((shape.left + w / 100).toString()) + '%';
                } else {
                    let w = Math.pow((distance.magX - radius/2), 2) - (radius*5)
                    left = parseFloat((shape.left - w / 100).toString()) + '%';
                }
            }

            return (<Circle
                key={index}
                //name= {shape}
                speed={shape.speed}
                top={top}
                left={left}
                color={shape.color}
                dimension={shape.dimension}
                shape = {shape.shape}
                index = {index}
                
            />)
        })

        return (
            <div  className="shapely-wrapper" onMouseMove={this._onMouseMove.bind(this)} >
                {shapes}
            </div>
        )
    }
}

export interface CircleProps {
    //name: string;
    speed: number;
    top: string; 
    left: string;
    index: number;
    // image: string;
    shape: React.StatelessComponent<any>;
    dimension: number;
    color: string;
}

class Circle extends React.Component<CircleProps> {
    readonly top: number; 


    constructor(props) {
        super(props)
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
        }
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
    componentWillReceiveProps(props) {
        this.setState({
            top: props.top,
            left: props.left
        })
    }

    getTop() {
        const top = this.props.top;

        return top.indexOf('%') > -1 ?
            window.innerHeight * (parseInt(top.replace('%', '')) / 100) :
            parseInt(top, 10)
    }


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

