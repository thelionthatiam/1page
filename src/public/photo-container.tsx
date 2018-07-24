import * as React from "react";
import * as LB from './lightbox'
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import { connect, Provider } from 'react-redux';
import { toggleBlinds, fetchPhotos } from './actions'
import { PhotoIcon, X } from './svg/icons'
import Measure from 'react-measure';
import Swipe from 'react-easy-swipe';


export interface Album {
    photos: any[];
    date: string;
}

export interface PhotoContainerProps {
    // getPhotos: () => Object;
    album: Album[];
    selected: boolean;
}

export interface PhotoContainerState {
    currentImage: number;
    expand: boolean;
    lightboxIsOpen: boolean;
}

export class PhotoContainer extends React.Component<PhotoContainerProps, PhotoContainerState> {
    constructor(props: PhotoContainerProps) {
        super(props)
        this.closeLightbox = this.closeLightbox.bind(this);
        // this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoSelected = this.gotoSelected.bind(this);
        this.expand = this.expand.bind(this);
    }

    public readonly state: PhotoContainerState = {
        currentImage: 0,
        expand: false,
        lightboxIsOpen: false
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
        }, () => console.log('closed'));
    }
    gotoPrevious() {
        if (this.state.currentImage - 1 < 0) {
            this.setState({
                currentImage: this.props.album.photos.length - 1
            })
        } else {
            this.setState({
                currentImage: this.state.currentImage - 1,
            });
        }
    }
    gotoNext() {
        if (this.state.currentImage + 1 >= this.props.album.photos.length) {
            this.setState({
                currentImage: 0
            })
        } else {
            this.setState({
                currentImage: this.state.currentImage + 1,
            });
        }
    }
    gotoSelected(event, number) {
        this.setState({
            currentImage: number
        })
    }

    expand(event) {
        event.preventDefault()

        this.setState({
            expand: !this.state.expand
        })
    }
    render() {
        let duration = 200;

        let transitionStyles = {
            entering: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
                width: '100%'
            },
            entered: {
                opacity: 1,
                transition: `opacity ${duration}ms ease-in-out`,
                width: '100%'
            },
            exiting: {
                opacity: .8,
                transition: `opacity ${duration}ms ease-in-out`,
                width: '100%'
            },
            exited: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
                width: '100%'
            }
        };

        let items = <h1></h1>
        if (this.props.album.length !== 0 && this.props.selected) {
            items = this.props.album.photos.map((photo, index) => {
                if (index < 1) {
                    return <div
                        className = 'photo-container-medium'
                        key = {photo.id}
                        onMouseEnter = {this.expand}
                        onMouseLeave = {this.expand}
                    >
                        <img
                            // onClick = {this.openLightbox}
                            className='img'
                            src={"/imgs/" + photo.src + ".JPG"}
                        />
                        <div className={this.state.expand ? 'expand-icon-wrapper' : 'expand-icon-wrapper-closed'}></div>
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
                                    <p className='small-text'>{this.props.album.date}</p>
                                    <LB.Lightbox
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