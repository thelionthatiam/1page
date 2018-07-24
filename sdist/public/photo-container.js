"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const LB = require("./lightbox");
const Transition_1 = require("react-transition-group/Transition");
class PhotoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            expand: false,
            lightboxIsOpen: false
        };
        this.closeLightbox = this.closeLightbox.bind(this);
        // this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.gotoSelected = this.gotoSelected.bind(this);
        this.expand = this.expand.bind(this);
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
            });
        }
        else {
            this.setState({
                currentImage: this.state.currentImage - 1,
            });
        }
    }
    gotoNext() {
        if (this.state.currentImage + 1 >= this.props.album.photos.length) {
            this.setState({
                currentImage: 0
            });
        }
        else {
            this.setState({
                currentImage: this.state.currentImage + 1,
            });
        }
    }
    gotoSelected(event, number) {
        this.setState({
            currentImage: number
        });
    }
    expand(event) {
        event.preventDefault();
        this.setState({
            expand: !this.state.expand
        });
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
        let items = React.createElement("h1", null);
        if (this.props.album.length !== 0 && this.props.selected) {
            items = this.props.album.photos.map((photo, index) => {
                if (index < 1) {
                    return React.createElement("div", { className: 'photo-container-medium', key: photo.id, onMouseEnter: this.expand, onMouseLeave: this.expand },
                        React.createElement("img", { 
                            // onClick = {this.openLightbox}
                            className: 'img', src: "/imgs/" + photo.src + ".JPG" }),
                        React.createElement("div", { className: this.state.expand ? 'expand-icon-wrapper' : 'expand-icon-wrapper-closed' }));
                }
            });
        }
        return (React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true }, state => React.createElement("div", { style: transitionStyles[state] },
            items,
            this.props.selected
                ?
                    React.createElement("div", { className: 'album-info' },
                        React.createElement("p", { className: 'small-text album-description' }, this.props.album.description),
                        React.createElement("p", { className: 'small-text' }, this.props.album.date),
                        React.createElement(LB.Lightbox, { photos: this.props.album.photos, isOpen: this.state.lightboxIsOpen, onClose: this.closeLightbox, gotoPrevious: this.gotoPrevious, gotoNext: this.gotoNext, gotoSelected: this.gotoSelected, currentImage: this.state.currentImage }))
                :
                    null))
        /* <Lightbox images={this.props.album.photos}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
        /> */
        );
    }
}
exports.PhotoContainer = PhotoContainer;
//# sourceMappingURL=photo-container.js.map