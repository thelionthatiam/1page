import * as React from "react";
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import { connect, Provider } from 'react-redux';
import { toggleBlinds, fetchPhotos } from './actions'
import * as PC from './photo-container'; 
import { PhotoIcon, X } from './svg/icons'
import Measure from 'react-measure';
import Swipe from 'react-easy-swipe';

class Blinds extends React.Component {
    props: {
        toggleBlinds:(steing, boolean) => Function;
        getPhotos:(string?) => Function;
        albums: any;
        route:string;
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.props.getPhotos(this.props.route)
        document.querySelector('body').classList.add('papaya-body');
    }

    componentWillUnmount() {
        document.querySelector('body').classList.remove('papaya-body')
    }

    handleClick(id, e) {
        e.preventDefault();
        let selectedAlbum = this.props.albums.filter(album => album.selected)
        if (selectedAlbum.length !== 0) {
            if (selectedAlbum[0].id === id ) {
                this.props.toggleBlinds(id, false)
            } else {
                this.props.toggleBlinds(id, true)
            }
            
        } else {
            this.props.toggleBlinds(id, true)
        }
        
    }

    findCurrentSelection() {
        let selectedAlbum = this.props.albums.filter(album => album.selected)
    }

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
        let blinds = this.props.albums.map((album, index) => {
            if (this.props.albums.length !==0) {
                let blindStyle = "wrapper";
                let photoWrapperStyle = 'album-wrapper'
                if (index % 2 === 0) {
                    blindStyle = "wrapper";
                    photoWrapperStyle = 'album-wrapper'
                } else {
                    blindStyle = "wrapper-flip";
                    photoWrapperStyle = 'album-wrapper-flip'
                }
            
                return (
                    <div key={album.id}>
                        <Blind
                            style={blindStyle}
                            selected={album.selected}
                            content={album.title}
                            description={album.description}
                            onClick={e => this.handleClick(album.id, e)}
                        />
                        <div className={photoWrapperStyle}>
                        <PC.PhotoContainer
                            album = {album}
                            selected = {album.selected}
                        />
                        </div>
                    </div>
                );
            }
        });

        return(
            <div>
                <Transition
                    in={true}
                    timeout={duration}
                    unmountOnExit={true}
                    mountOnEnter={true}
                    appear={true}
                    componentWillLeave={this.componentWillLeave}
                    >
                    {state =>
                        <div style={transitionStyles[state]} className='page-wrapper'>
                            {blinds}
                        </div>
                    }
                   
                </Transition>
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
        return (
            <div
                className= { this.props.style }
                onClick = { this.props.onClick }
                >
                    
                        <div className='album-title-wrapper'>
                            {
                                this.props.selected
                                    ?
                                    <p className='album-title album-title-selected'>{this.props.content}</p>
                                    :
                                    <p className='album-title'>{this.props.content}</p>
                            }
                            <div className='spacer'></div>
                            {
                                this.props.selected 
                                ? 
                                <div className = 'centered'>< div className='small-dot'></div></div> 
                                : 
                                <div className = 'centered'>< div className='no-dot'></div></div> 
                            }
                        </div>
            </div>  
        );
    }
}

const mapStateToProps = state => {
    return {
        blinds: state.all.blinds, 
        albums: state.all.albums
    }
}

const mapDispatchToProps = dispatch => {
    return {
        toggleBlinds: (id, isOpen) => dispatch(toggleBlinds(id, isOpen)),
        getPhotos: (route) => dispatch(fetchPhotos(route))
    }
}

const BlindsAction = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blinds)



export default BlindsAction;