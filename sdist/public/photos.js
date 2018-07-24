"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Transition_1 = require("react-transition-group/Transition");
const react_redux_1 = require("react-redux");
const actions_1 = require("./actions");
class PhotoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        this.props.getPhotos();
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
        let items = React.createElement("h1", null, "nothing here yet!");
        if (this.props.albums.length !== 0) {
            items = this.props.albums.map((item) => {
                return React.createElement("div", { key: item.id, title: item.title },
                    React.createElement("h2", null, item.title),
                    React.createElement("p", { className: 'small-text' }, item.date),
                    React.createElement("p", { className: 'small-text margin-bottom' }, item.description),
                    item.photos.length > 0 ?
                        item.photos.map((item) => {
                            return React.createElement("div", { key: item.id },
                                React.createElement("img", { className: 'img', src: "/imgs/" + item.photo + ".jpg" }));
                        }) :
                        null);
            });
        }
        return (React.createElement("div", { className: 'page-wrapper' },
            React.createElement("div", { className: 'title-wrapper' },
                React.createElement("img", { className: 'title-icon', src: '/icons/titles/photo-icon.svg' }),
                React.createElement("h1", { className: 'title' }, "THIS IS A BEATIFUL TITLE")),
            React.createElement("div", { className: 'album-wrapper' },
                React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true }, state => React.createElement("div", { style: transitionStyles[state] }, items)))));
    }
}
const mapStateToProps = state => {
    return {
        albums: state.all.albums // this data structure needs to happen
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getPhotos: () => dispatch(actions_1.fetchPhotos())
    };
};
const Photos = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PhotoContainer);
exports.default = Photos;
//# sourceMappingURL=photos.js.map