import * as React from "react";
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import { connect, Provider } from 'react-redux';
import { toggleBlinds, fetchPhotos } from './actions'
import Gallery from 'react-photo-gallery';
import { PhotoIcon, X } from './svg/icons'
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
                        <PhotoContainer
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

class PhotoContainer extends React.Component {
    props: {
        getPhotos: () => Object;
        album: any;
    }
    state: {
        currentImage:number;
    }
    constructor(props) {
        super(props)
        this.state = { currentImage: 0 };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoSelected = this.gotoSelected.bind(this);
    }
    openLightbox(event, obj) {
        this.setState({
            // currentImage: obj.index,
            lightboxIsOpen: true,
        });
    }
    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }
    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }
    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }
    gotoSelected(event, number) {
        this.setState({
            currentImage:number
        })
    }
    render() {
        let duration = 200;

        let transitionStyles = {
            entering: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
                width:'100%'
            },
            entered: {
                opacity: 1,
                transition: `opacity ${duration}ms ease-in-out`,
                width:'100%'
            },
            exiting: {
                opacity: .8,
                transition: `opacity ${duration}ms ease-in-out`,
                width:'100%'
            },
            exited: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
                width:'100%'
            }
        };
    
        let items = <h1></h1>
        if (this.props.album.length !== 0 && this.props.selected) {
            items =  this.props.album.photos.map((photo, index) => {
                    if (index < 1) {
                        return <div className='photo-container-medium' key={photo.id}>
                            <img  
                            onClick={this.openLightbox} 
                            className='img' 
                            src={"/imgs/" + photo.src + ".jpg"} 
                            />
                        </div>
                    }      
            })
        }
        
        return (
            
           
                <Transition
                    in={true}
                    timeout={duration}
                    unmountOnExit={true}
                    mountOnEnter={true}
                    appear={true}>
                    {state =>
                        <div style={transitionStyles[state]}>
                            {items}
                            {
                                this.props.selected
                                    ?
                                    <div className='album-info'>
                                        <p className='small-text album-description'>{this.props.album.description}</p>
                                        {/* <div className='line'></div> */}
                                        <p>{this.props.album.date}</p>
                                        <Lightbox
                                            photos={this.props.album.photos}
                                            isOpen={this.state.lightboxIsOpen}
                                            onClose={this.closeLightbox}
                                            gotoPrevious={this.gotoPrevious}
                                            gotoNext={this.gotoNext}
                                            gotoSelected={this.gotoSelected}
                                            currentImage={this.state.currentImage}
                                        />
                                    </div>
                                    :
                                    null
                            }
                        </div>
                    }
                    
                </Transition>
                
                /* <Lightbox images={this.props.album.photos}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                /> */
            
        )
    }
}

class Lightbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rendered:true,
            xStyle:'x-icon'
        } 
        this.showX = this.showX.bind(this)
        this.hideX = this.hideX.bind(this)
    }

    componentDidMount() {
        setTimeout(
            () => {
            this.setState({
                rendered: true
            })
        },3000)      
    }

    componentWillUnmount() {
        this.setState({
            rendered:false
        })
    }

    showX() {
        this.setState({
            xStyle: 'x-icon-hover'
        })
    }

    hideX() {
        this.setState({
            xStyle: 'x-icon'
        })
    }

    render() {
        let img = "/imgs/" + this.props.photos[this.props.currentImage].src + ".jpg";
        {
            return this.props.isOpen
                ? 
                    <div 
                        className='lightbox-wrapper'
                        scroll="no"
                        >
                        <div className='lightbox-title-wrapper'>
                            <PhotoIcon 
                                styles=
                                {this.state.rendered 
                                   ? 
                                   'svg-icon lightbox-icon-show'
                                   :
                                   'svg-icon lightbox-icon'
                                }
                                />
                            <X styles = {this.state.xStyle}/> 
                        </div>
                        <div 
                            className='lightbox-photo-wrapper'
                            onClick = {this.props.onClose}
                            >
                            <img 
                                className='lightbox-img' 
                                src={img}
                                id = {this.props.currentImage}
                                onMouseOver = {this.showX}
                                onMouseLeave = {this.hideX}
                                />
                            
                        
                        </div>
                        <DotBox 
                            photos = {this.props.photos}
                            gotoSelected = {this.props.gotoSelected}
                            currentImage = {this.props.currentImage}
                            />
                        {/* <button onClick = {this.props.onClose}>close</button>
                        <button onClick={this.props.gotoNext}>next</button>
                        <button onClick={this.props.gotoPrevious}>prev</button> */}
                    </div>
                :
                null
        }
        
    }
}

function DotBox(props) {

    let style = {
        background: '#ff6347'
    }

    return (
        <div className = 'dot-box-wrapper'>
            {
                props.photos.map((photo, index) => {
                    return (
                        <div 
                            className = 'lightbox-dot' 
                            key = {index}
                            onClick = {(event) => props.gotoSelected(event, index)}
                            style = {
                                index === props.currentImage
                                ?
                                style
                                :
                                null
                            }
                            > 
                        </div>
                    )
                })
            }
        </div>
    )
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
        getPhotos: () => dispatch(fetchPhotos())
    }
}

const BlindsAction = connect(
    mapStateToProps,
    mapDispatchToProps
)(Blinds)



export default BlindsAction;