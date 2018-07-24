"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Transition_1 = require("react-transition-group/Transition");
const react_redux_1 = require("react-redux");
const actions_1 = require("./actions");
const PC = require("./photo-container");
class Blinds extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        this.props.getPhotos(this.props.route);
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
                        React.createElement(PC.PhotoContainer, { album: album, selected: album.selected }))));
            }
        });
        return (React.createElement("div", null,
            React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true, componentWillLeave: this.componentWillLeave }, state => React.createElement("div", { style: transitionStyles[state], className: 'page-wrapper' }, blinds))));
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
                React.createElement("div", { className: 'spacer' }),
                this.props.selected
                    ?
                        React.createElement("div", { className: 'centered' },
                            React.createElement("div", { className: 'small-dot' }))
                    :
                        React.createElement("div", { className: 'centered' },
                            React.createElement("div", { className: 'no-dot' })))));
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
//# sourceMappingURL=blinds.js.map