"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const icons_1 = require("./svg/icons");
const react_easy_swipe_1 = require("react-easy-swipe");
class Lightbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rendered: true,
            xStyle: 'x-icon',
            left: false,
            right: false
        };
        this.showX = this.showX.bind(this);
        this.hideX = this.hideX.bind(this);
        this.onSwipeEnd = this.onSwipeEnd.bind(this);
        this.onSwipeStart = this.onSwipeStart.bind(this);
        this.onSwipeMove = this.onSwipeMove.bind(this);
    }
    onSwipeStart(event) {
        //console.log('Start swiping...', event);
        // this.start()
    }
    onSwipeMove(position, event) {
        //console.log(`Moved ${position.x} pixels horizontally`, event);
        if (position.x < -100) {
            this.setState({ right: false });
            this.setState({ left: true });
        }
        else if (position.x < 0) {
            this.setState({ left: false });
            this.setState({ right: false });
        }
        else if (position.x < 100) {
            this.setState({ left: false });
            this.setState({ right: false });
        }
        else if (position.x >= 100) {
            this.setState({ left: false });
            this.setState({ right: true });
        }
        // console.log(`Moved ${position.y} pixels vertically`, event);
    }
    onSwipeEnd(event) {
        //console.log('state', this.state.left, this.state.right)
        if (this.state.left) {
            console.log(this.state.left, 'left');
            this.props.gotoPrevious();
            this.setState({ left: false });
            this.setState({ right: false });
        }
        else if (this.state.right) {
            console.log(this.state.right, 'right');
            this.props.gotoNext();
            this.setState({ left: false });
            this.setState({ right: false });
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                rendered: true
            });
        }, 3000);
    }
    componentWillUnmount() {
        this.setState({
            rendered: false
        });
    }
    showX() {
        this.setState({
            xStyle: 'x-icon-hover bold-stroke'
        });
    }
    hideX() {
        this.setState({
            xStyle: 'x-icon-hover'
        });
    }
    render() {
        let img = 'https://ih1.redbubble.net/image.91369793.6242/flat,1000x1000,075,f.jpg';
        if (this.props.photos[this.props.currentImage]) {
            img = "/imgs/" + this.props.photos[this.props.currentImage].src + ".jpg";
        }
        {
            return this.props.isOpen
                ?
                    React.createElement("div", { className: 'lightbox-wrapper', scroll: "no" },
                        React.createElement("div", { className: 'lightbox-title-wrapper' },
                            React.createElement(icons_1.PhotoIcon, { styles: this.state.rendered
                                    ?
                                        'svg-icon lightbox-icon-show'
                                    :
                                        'svg-icon lightbox-icon' })),
                        React.createElement("div", { className: 'lightbox-left-paddle', onClick: this.props.gotoPrevious, onMouseOver: this.hideX },
                            React.createElement("div", { className: 'left-triangle' })),
                        React.createElement(react_easy_swipe_1.default, { onSwipeStart: this.onSwipeStart, onSwipeMove: this.onSwipeMove, onSwipeEnd: this.onSwipeEnd },
                            React.createElement("div", { className: 'lightbox-photo-wrapper', onClick: this.props.onClose },
                                React.createElement("img", { className: 'lightbox-img', src: img, id: this.props.currentImage, onMouseOver: this.showX, onMouseLeave: this.hideX }))),
                        React.createElement("div", { className: 'lightbox-right-paddle', onClick: this.props.gotoNext, onMouseOver: this.hideX },
                            React.createElement("div", { className: 'right-triangle' })),
                        React.createElement(icons_1.X, { styles: this.state.xStyle, onClick: this.props.onClose, onMouseOver: this.showX, onMouseLeave: this.hideX }),
                        React.createElement(DotBox, { photos: this.props.photos, gotoSelected: this.props.gotoSelected, currentImage: this.props.currentImage }))
                :
                    null;
        }
    }
}
exports.Lightbox = Lightbox;
function DotBox(props) {
    let style = {
        background: '#deccaf'
    };
    return (React.createElement("div", { className: 'dot-box-wrapper' }, props.photos.map((photo, index) => {
        return (React.createElement("div", { className: 'lightbox-dot', key: index, onClick: (event) => props.gotoSelected(event, index), style: index === props.currentImage
                ?
                    style
                :
                    null }));
    })));
}
//# sourceMappingURL=lightbox.js.map