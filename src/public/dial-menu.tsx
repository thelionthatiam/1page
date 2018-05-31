import * as React from 'react';
import {
    PhotoIcon, 
    Repository,
    Home,
    About,
    CurrentWork,
    LeftArrow

} from './svg/icons'

interface Item {
    position:number;
    selected:boolean;
    title:string;
    class:string;
}



export default class Dial extends React.Component {
    incriment:number;
    _timeout:any;

    state:{
        position:number;
        items:Item[];
        rotation:number;
        scrollStatus:string;
    }



    constructor(props) {
        super(props)
        this.state = {
            position: 0,
            items: [
                {
                    position:0,
                    selected:true,
                    title:'moving',
                    class: 'di1 item'
                }, 
                {
                    position:1,
                    selected:false,
                    title:'photos',
                    class: 'di2 item'
                }, 
                {
                    position:2,
                    selected:false,
                    title:'whatever',
                    class: 'di3 item'
                }, 
                {
                    position:3,
                    selected:false,
                    title:'asdf',
                    class: 'di4 item'
                }, 
                {
                    position:4,
                    selected:false,
                    title:'ldsfga;',
                    class: 'di5 item'
                }, 
                {
                    position:5,
                    selected:false,
                    title:'^_^',
                    class: 'di6 item'
                }, 
                {
                    position:6,
                    selected:false,
                    title:'-_-',
                    class: 'di7 item'
                }, 
                {
                    position:7,
                    selected:false,
                    title:'0.o',
                    class: 'di8 item'
                }
            ],
            rotation: 0,
            scrollStatus: ''
        }

        this.incriment = 360 / this.state.items.length;
        this.nextPosition = this.nextPosition.bind(this);
        this.prevPosition = this.prevPosition.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this._timeout = null;
    }

    componentDidMount() {
        window.addEventListener('wheel', this.handleScroll)
        this.setRotation()
    }

    componentWillUnmount() {
        window.removeEventListener('wheel', this.handleScroll)
    }

    handleScroll(event) {
        if (this._timeout) { //if there is already a timeout in process cancel it
            clearTimeout(this._timeout);
        }
        this._timeout = setTimeout(() => {
            this._timeout = null;
            this.setState({
                scrollStatus: 'scroll stopped'
            }, () => {
                let rotation = this.state.rotation
                // let rounds = Math.floor(rotation/360)
                // let absRotation = rotation - (rounds*360)
                let position = Math.round(8 * (rotation / 360))
                this.setPosition(position)
            });
        }, 500);
        if (this.state.scrollStatus !== 'scrolling') {
            this.setState({
                scrollStatus: 'scrolling'
            });
        }

        if (event.deltaY > 0) {
            this.scrollPos()
        } else {
            this.scrollNeg()
        }
    }

    scrollPos() {
        this.setState({
            rotation: this.state.rotation + 1
        })
    }

    scrollNeg() {
        this.setState({
            rotation: this.state.rotation - 1
        })
    }

    setPosition(position) {
        console.log('sent pos', position)
        this.setState({
            position: position
        }, () => this.setRotation())
    }

    nextPosition() {
        this.setState({
            position: this.state.position + 1
        }, () => this.setRotation())
    }

    prevPosition() {
        this.setState({
            position: this.state.position - 1
        }, () => this.setRotation())
    }

    setRotation() {
        this.setState({
            rotation: this.state.position * this.incriment
        }, () => {
            let updatedItems = []
            let position = this.state.position
            
            for (let i = 0; i < this.state.items.length; i++) {
                this.state.items[i].selected = false
                if (position >= 0) {
                        if (position === 0) {
                            this.state.items[0].selected = true
                        } else if (this.state.items[i].position !== Math.abs(position - 8)) {
                            this.state.items[i].selected = false
                        } else if (this.state.items[i].position === Math.abs(position - 8)) {
                            this.state.items[i].selected = true
                        } 

                } else {
                    {
                        if (position === 0) {
                            this.state.items[0].selected = true
                        } else if (this.state.items[i].position !== Math.abs(position)) {
                            this.state.items[i].selected = false
                        } else if (this.state.items[i].position === Math.abs(position)) {
                            this.state.items[i].selected = true
                        }
                    }
                }
                updatedItems.push(this.state.items[i])
            }
            this.setState({
                items:updatedItems
            })
        })
    }


    render() {
        let style = {
            transform: `rotate(${this.state.rotation}deg)`
        }

        let opStyle = {
            transform: `rotate(-${this.state.rotation}deg)`
        }
        if (this.state.rotation < 0) {
            opStyle = {
                transform: `rotate(${Math.abs(this.state.rotation)}deg)`
            }
        }
        let selected = this.state.items.filter(item => {
            // console.log('item', item)
            return item.selected === true
        })
        // console.log('selected?', selected, typeof selected)
        let showSelected = (
                <div className = 'selected-repository' >
                    <PhotoIcon styles='r-menu-icons selected' />
                    <p className='r-menu-titles'>{selected[0].title}</p>
                </div>
            )
        
        return (
            <div className='page-wrapper'>
                <div className = 'r-menu-back'>
                    <LeftArrow style = 'r-menu-back-icon'/>
                </div>
                {showSelected}
                <div className='dial' style={style}>
                    {this.state.items.map((item, index) => {
                        return (
                            <div className={item.class} 
                                 style={opStyle}
                                 key = {index} 
                                 onClick = {() => this.setPosition(-1*item.position)} >
                                <PhotoIcon styles={item.selected ? 'r-menu-icons selected-mini' : 'r-menu-icons'} />
                            </div>
                        )
                    })}
                    <div className='showDial'>
                        <Repository class={"menu-icons"}/>
                    </div>
                </div>
                <div>
                    <button onClick={this.prevPosition} >prev</button>
                    <button onClick={this.nextPosition} >next</button>
                </div>
            </div>
        )
    }
}


