import * as React from "react";
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import { connect, Provider } from 'react-redux';
import { toggleBlinds, fetchPhotos } from './actions'
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import Measure from 'react-measure';

class Blinds extends React.Component {
    props: {
        toggleBlinds:(steing, boolean) => Function;
        getPhotos:() => Function;
        albums: any;
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.props.getPhotos()
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
        let blinds = this.props.albums.map(data => {
            if (this.props.albums.length !==0) {
                let blindStyle = "wrapper";
                let photoWrapperStyle = 'album-wrapper'
                if (data.id % 2 === 0) {
                    blindStyle = "wrapper";
                    photoWrapperStyle = 'album-wrapper'
                } else {
                    blindStyle = "wrapper-flip";
                    photoWrapperStyle = 'album-wrapper-flip'
                }
            
                return (
                    <div key={data.id}>
                        <Blind
                            style={blindStyle}
                            selected={data.selected}
                            content={data.title}
                            description={data.description}
                            onClick={e => this.handleClick(data.id, e)}
                        />
                        <PhotoContainer
                            style = {photoWrapperStyle}
                            album = {data}
                            selected = {data.selected}
                        />
                    </div>
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
        return (
            <div>
                
                <div
                    className= { this.props.style }
                    onClick = { this.props.onClick }
                    >
                      
                            <div className='album-title-wrapper'>
                                <p className='album-title'>{this.props.content}</p>
                                {/* <div className='line'></div>
                                <img className='small-icon' src='/icons/white/x.svg' /> */}
                            </div>
                </div>
                
            </div>
        );
    }
}

class PhotoContainer extends React.Component {
    props: {
        getPhotos: () => Object;
        album: any;
    }
    constructor(props) {
        super(props)
    }

    render() {
        let duration = 200;

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
    
        let items = <h1></h1>
        if (this.props.album.length !== 0 && this.props.selected) {
            let style = {
                marginTop: "15px",
                marginBottom: "15px"
            }
            items =  this.props.album.photos.map((photo) => {
                            return <div
                                key={photo.id}
                                style = {style}
                                >
                                <img className='img' src={"/imgs/" + photo.src + ".jpg"} />
                            </div>
                        }) 
                        
        } 
        
        return (
            
            <div className={this.props.style}>
                <Transition
                    in={true}
                    timeout={duration}
                    unmountOnExit={true}
                    mountOnEnter={true}
                    appear={true}>
                    {state =>
                        <div style={transitionStyles[state]}>
                            {items}
                        </div>
                    }
                </Transition>
            </div>
        )
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