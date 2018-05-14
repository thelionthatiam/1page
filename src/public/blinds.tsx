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
        toggleBlinds:(boolean) => Function;
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

    addSateToAlbums() {
        console.log('BLINDS ALBMUMS DATA', this.props.albums)
        if (this.props.albums.length !== 0) {
            for (let i = 0; i < this.props.albums.length; i++) {
                this.props.albums[i].selected = false
            }
        }
    }

    handleClick(id, e) {
        e.preventDefault();
        console.log('id check two ||||||', id)
        let freeze = this.props.albums;
        for (let i = 0; i < freeze.length; i++) {
            for (let k in freeze[i]) {
                console.log('id check three ||||', freeze[i].id, id)
                if (freeze[i].id !== id) {
                    freeze[i].selected = false;
                } else {
                    freeze[i].selected = true;
                }
            }
        }
        this.setState({
            active: true,
            blinds: freeze
        }, () => {
            this.props.toggleBlinds(this.state.active)
        });
        
    }

    revert(e) {
        e.preventDefault();
        this.setState({
            active: false
        }, () => {
            this.props.toggleBlinds(this.state.active)
        });
    }

    render() {
        // this.addSateToAlbums()
        let blinds = this.props.albums.map(data => {
            if (this.props.albums.length !==0) {
                // console.log('id check', data.id)
                return (
                    <Blind
                        key={data.id}
                        number={data.id}
                        active={this.state.active}
                        selected={data.selected}
                        content={data.title}
                        onClick={e => this.handleClick(data.id, e)}
                    />
                );
            }
        });

        return(
            <div className = "page-wrapper" >
                { blinds }
                < button className = 'revert-button' onClick = { this.revert } > revert </button>
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
                transition: "1000ms",
                height: "0px",
                fontSize: '0px'
            },
            selected: {
                transition: "1000ms",
                top: "0"
            },
        };
    }

    render() {
        let baseStyle = "wrapper";
        this.props.number % 2 === 0
            ? (baseStyle = "wrapper")
            : (baseStyle = "wrapper-flip");

        let activeStyle = null;
        if (this.props.active) {
            this.props.selected ? activeStyle = this.state.selected : activeStyle = this.state.off;
        }            
    
        return (
            <div
                className= { baseStyle }
                style = { activeStyle }
                onClick = { this.props.onClick }
                >
                <h1>{ this.props.content } </h1>
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
        toggleBlinds: (isOpen) => dispatch(toggleBlinds(isOpen)),
        getPhotos: () => dispatch(fetchPhotos())
    }
}

const BlindsAction = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blinds)


export default BlindsAction;