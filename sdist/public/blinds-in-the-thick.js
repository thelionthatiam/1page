"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Transition_1 = require("react-transition-group/Transition");
const react_redux_1 = require("react-redux");
const actions_1 = require("./actions");
class Blinds extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        // this.props.getPhotos(this.props.route)
        document.querySelector('body').classList.add('papaya-body');
    }
    componentWillUnmount() {
        document.querySelector('body').classList.remove('papaya-body');
    }
    handleClick(id, e) {
        e.preventDefault();
        let selectedAlbum = this.props.albums.filter(album => album.selected);
        if (selectedAlbum.length !== 0) {
            if (selectedAlbum[0].id === id) {
                this.props.toggleBlinds(id, false);
            }
            else {
                this.props.toggleBlinds(id, true);
            }
        }
        else {
            this.props.toggleBlinds(id, true);
        }
    }
    findCurrentSelection() {
        let selectedAlbum = this.props.albums.filter(album => album.selected);
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
            if (this.props.albums.length !== 0) {
                let blindStyle = "wrapper";
                let photoWrapperStyle = 'album-wrapper';
                if (index % 2 === 0) {
                    blindStyle = "wrapper";
                    photoWrapperStyle = 'album-wrapper';
                }
                else {
                    blindStyle = "wrapper-flip";
                    photoWrapperStyle = 'album-wrapper-flip';
                }
                return (React.createElement("div", { key: album.id },
                    React.createElement(Blind, { style: blindStyle, selected: album.selected, content: album.title, description: album.description, onClick: e => this.handleClick(album.id, e) }),
                    React.createElement("div", { className: photoWrapperStyle },
                        React.createElement(PhotoContainer, { album: album, selected: album.selected }))));
            }
        });
        return (React.createElement("div", null,
            React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true, componentWillLeave: this.componentWillLeave }, state => React.createElement("div", { style: transitionStyles[state], className: 'page-wrapper' },
                React.createElement("div", { key: '1' },
                    React.createElement(Blind, { style: "thick-wrapper", selected: false, content: "ulmus procera", description: null, onClick: e => this.handleClick('1', e) }))))));
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
        return (React.createElement("div", { className: this.props.style, onClick: this.props.onClick },
            React.createElement("div", { className: 'album-title-wrapper' },
                this.props.selected
                    ?
                        React.createElement("p", { className: 'album-title album-title-selected' }, this.props.content)
                    :
                        React.createElement("p", { className: 'album-title' }, this.props.content),
                React.createElement("div", null,
                    React.createElement("img", { src: '/icons/when-in-the-thick/mini-pink-1.png' })),
                this.props.selected
                    ?
                        React.createElement("div", { className: 'centered' },
                            React.createElement("div", { className: 'small-dot' }))
                    :
                        React.createElement("div", { className: 'centered' },
                            React.createElement("div", { className: 'no-dot' })))));
    }
}
class PhotoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentImage: 0,
            expand: false
        };
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
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
                        React.createElement("img", { className: 'img', src: "/imgs/" + photo.src + ".JPG" }),
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
                        React.createElement(Lightbox, { photos: this.props.album.photos, isOpen: this.state.lightboxIsOpen, onClose: this.closeLightbox, gotoPrevious: this.gotoPrevious, gotoNext: this.gotoNext, gotoSelected: this.gotoSelected, currentImage: this.state.currentImage }))
                :
                    null)));
    }
}
const mapStateToProps = state => {
    return {
        blinds: state.all.blinds,
        albums: state.all.albums
    };
};
const mapDispatchToProps = dispatch => {
    return {
        toggleBlinds: (id, isOpen) => dispatch(actions_1.toggleBlinds(id, isOpen)),
        getPhotos: (route) => dispatch(actions_1.fetchPhotos(route))
    };
};
const BlindsAction = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Blinds);
exports.default = BlindsAction;
//# sourceMappingURL=blinds-in-the-thick.js.map