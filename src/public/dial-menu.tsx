import * as React from 'react';
import {
    PhotoIcon,
    VideoIcon,
    CrowdIcon,
    CurlIcon,
    DeltaIcon,
    MovementIcon,
    ObjectsIcon,
    ParallelIcon,
    TieFighterIcon,
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
    icon:React.Component;
    link:string;
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
            position: 1,
            items: [
                {
                    position:7,
                    selected:false,
                    title:'photo',
                    class: 'di1 item',
                    icon: PhotoIcon,
                    link: '/photo'
                }, 
                {
                    position:0,
                    selected:false,
                    title:'video',
                    class: 'di2 item',
                    icon: VideoIcon,
                    link: '/photo'
                }, 
                {
                    position:1,
                    selected:true,
                    title:'whatever',
                    class: 'di3 item',
                    icon:CrowdIcon,
                    link: '/photo'
                }, 
                {
                    position:2,
                    selected:false,
                    title:'asdf',
                    class: 'di4 item',
                    icon:DeltaIcon,
                    link: '/photo'
                }, 
                {
                    position:3,
                    selected:false,
                    title:'ldsfga;',
                    class: 'di5 item',
                    icon:MovementIcon,
                    link: '/photo'
                }, 
                {
                    position:4,
                    selected:false,
                    title:'^_^',
                    class: 'di6 item',
                    icon:ObjectsIcon,
                    link: '/photo'
                }, 
                {
                    position:5,
                    selected:false,
                    title:'-_-',
                    class: 'di7 item',
                    icon:ParallelIcon,
                    link: '/photo'
                }, 
                {
                    position:6,
                    selected:false,
                    title:'0.o',
                    class: 'di8 item',
                    icon:TieFighterIcon,
                    link: '/photo'
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
                            this.state.items[1].selected = true
                        } else 
                        if (this.state.items[i].position !== Math.abs(position - 8)) {
                            this.state.items[i].selected = false
                        } else if (this.state.items[i].position === Math.abs(position - 8)) {
                            this.state.items[i].selected = true
                        } 

                } else {
                    {
                        if (position === 0) {
                            this.state.items[1].selected = true
                        } else 
                        if (this.state.items[i].position !== Math.abs(position)) {
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
        let SelectedIcon = selected[0].icon
        let showSelected = (
                <div className = 'selected-repository' >
                    <SelectedIcon styles='r-menu-icons selected' />
                    <a href = {selected[0].link} className='r-menu-titles'>{selected[0].title}</a>
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
                        let Icon = item.icon
                        return (
                            <div className={item.class} 
                                 style={opStyle}
                                 key = {index} 
                                 onClick = {() => this.setPosition(-1*item.position)} >
                                <Icon styles={item.selected ? 'r-menu-icons selected-mini' : 'r-menu-icons'} />
                            </div>
                        )
                    })}
                    <div className='showDial' style = {opStyle}>
                        <Repository class={"menu-icons"}/>
                    </div>
                </div>
                {/* <div>
                    <button onClick={this.prevPosition} >prev</button>
                    <button onClick={this.nextPosition} >next</button>
                </div> */}
            </div>
        )
    }
}


