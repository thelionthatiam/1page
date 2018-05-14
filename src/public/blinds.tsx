import * as React from "react";
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import { connect, Provider } from 'react-redux';
import { toggleBlinds, fetchPhotos } from './actions'


class Blinds extends React.Component {
    state: {
        active:boolean;
        blinds:any;
    }
    props: {
        toggleBlinds:(steing, boolean) => Function;
        getPhotos:() => Function;
        albums: any;
    }

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            blinds: this.props.albums
        };
        this.handleClick = this.handleClick.bind(this);
        this.revert = this.revert.bind(this);
    }

    componentWillMount() {
        this.props.getPhotos()
    }

    handleClick(id, e) {
        e.preventDefault();
        let currentState = this.state.active
        this.setState({
            active: !currentState,
        }, () => {
            console.log(this.state.active)
            this.props.toggleBlinds(id, this.state.active)
        });
        
    }

    revert(e) {
        e.preventDefault();
        this.setState({
            active: false
        }, () => {
            this.props.toggleBlinds(null, this.state.active)
        });
    }

    componentWillLeave()

    render() {
        let duration = 400;

        let transitionStyles = {
            entering: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            entered: {
                opacity: 1,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            exiting: {
                opacity: .8,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            exited: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
            }
        };
        let blinds = this.props.albums.map(data => {
            if (this.props.albums.length !==0 && !this.state.active) {
                // console.log('id check', data.id)
                return (
                    <Blind
                        key={data.id}
                        number={data.id}
                        active={this.state.active}
                        selected={data.selected}
                        content={data.title}
                        description={data.description}
                        onClick={e => this.handleClick(data.id, e)}
                    />
                );
            } else if (this.props.albums.length !== 0 && this.state.active && data.selected) {
                return (
                    <Blind
                        key={data.id}
                        number={data.id}
                        active={this.state.active}
                        selected={data.selected}
                        content={data.title}
                        description={data.description}
                        onClick={e => this.handleClick(data.id, e)}
                    />
                );
            }
        });

        return(
            <div className = "page-wrapper" >
                <Transition
                    in={true}
                    timeout={duration}
                    unmountOnExit={true}
                    mountOnEnter={true}
                    appear={true}
                    componentWillLeave={this.componentWillLeave}>
                    {state =>
                        <div style={transitionStyles[state]}>
                            {blinds}
                        </div>
                    }
                </Transition>
                {/* {this.state.active ? < img className = 'small-icon'  src = '/icons/white/x.svg' onClick = { this.revert } />: null } */}
            </div>
        );
    }
}

class Blind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            off: {
                opacity: "0",
                transition: "200ms",
                height: "15px"
            },
            selected: {
                transition: "200ms",
                top: "0"
            },
        };
    }

    render() {
        let baseStyle = "wrapper";
        this.props.number % 2 === 0
            ? (baseStyle = "wrapper")
            : (baseStyle = "wrapper-flip");

        // let activeStyle = null;
        // if (this.props.active) {
        //     this.props.selected ? activeStyle = this.state.selected : activeStyle = this.state.off;
        // }            
        console.log('active', this.props.active, 'selected', this.props.selected)
        return (
            <div>
                
                <div
                    className= { baseStyle }
                    // style = { activeStyle }
                    onClick = { this.props.onClick }
                    >
                      
                            <div className='album-title-wrapper'>
                                <p className='album-title'>{this.props.content}</p>
                                {/* <div className='line'></div>
                                <img className='small-icon' src='/icons/white/x.svg' /> */}
                            </div>
                    
                </div>
                {/* {this.props.selected && this.props.active ? <p className="description">{this.props.description}</p>:null} */}
                
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        blinds: state.all.blinds, // this data structure needs to happen
        albums: state.all.albums
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleBlinds: (id, isOpen) => dispatch(toggleBlinds(id, isOpen)),
        getPhotos: () => dispatch(fetchPhotos())
    }
}

const BlindsAction = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blinds)


export default BlindsAction;