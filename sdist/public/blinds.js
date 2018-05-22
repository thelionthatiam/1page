"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Transition_1 = require("react-transition-group/Transition");
var react_redux_1 = require("react-redux");
var actions_1 = require("./actions");
var icons_1 = require("./svg/icons");
var Blinds = /** @class */ (function (_super) {
    __extends(Blinds, _super);
    function Blinds(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    Blinds.prototype.componentWillMount = function () {
        this.props.getPhotos();
    };
    Blinds.prototype.handleClick = function (id, e) {
        e.preventDefault();
        var selectedAlbum = this.props.albums.filter(function (album) { return album.selected; });
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
    };
    Blinds.prototype.findCurrentSelection = function () {
        var selectedAlbum = this.props.albums.filter(function (album) { return album.selected; });
    };
    Blinds.prototype.render = function () {
        var _this = this;
        var duration = 400;
        var transitionStyles = {
            entering: {
                opacity: 0,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            entered: {
                opacity: 1,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            exiting: {
                opacity: .8,
                transition: "opacity " + duration + "ms ease-in-out",
            },
            exited: {
                opacity: 0,
                transition: "opacity " + duration + "ms ease-in-out",
            }
        };
        var blinds = this.props.albums.map(function (album, index) {
            if (_this.props.albums.length !== 0) {
                var blindStyle = "wrapper";
                var photoWrapperStyle = 'album-wrapper';
                if (index % 2 === 0) {
                    blindStyle = "wrapper";
                    photoWrapperStyle = 'album-wrapper';
                }
                else {
                    blindStyle = "wrapper-flip";
                    photoWrapperStyle = 'album-wrapper-flip';
                }
                return (React.createElement("div", { key: album.id },
                    React.createElement(Blind, { style: blindStyle, selected: album.selected, content: album.title, description: album.description, onClick: function (e) { return _this.handleClick(album.id, e); } }),
                    React.createElement("div", { className: photoWrapperStyle },
                        React.createElement(PhotoContainer, { album: album, selected: album.selected }))));
            }
        });
        return (React.createElement("div", null,
            React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true, componentWillLeave: this.componentWillLeave }, function (state) {
                return React.createElement("div", { style: transitionStyles[state], className: 'page-wrapper' }, blinds);
            })));
    };
    return Blinds;
}(React.Component));
var Blind = /** @class */ (function (_super) {
    __extends(Blind, _super);
    function Blind(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
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
        return _this;
    }
    Blind.prototype.render = function () {
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
    };
    return Blind;
}(React.Component));
var PhotoContainer = /** @class */ (function (_super) {
    __extends(PhotoContainer, _super);
    function PhotoContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { currentImage: 0 };
        _this.closeLightbox = _this.closeLightbox.bind(_this);
        _this.openLightbox = _this.openLightbox.bind(_this);
        _this.gotoNext = _this.gotoNext.bind(_this);
        _this.gotoPrevious = _this.gotoPrevious.bind(_this);
        _this.gotoSelected = _this.gotoSelected.bind(_this);
        return _this;
    }
    PhotoContainer.prototype.openLightbox = function (event, obj) {
        this.setState({
            // currentImage: obj.index,
            lightboxIsOpen: true,
        });
    };
    PhotoContainer.prototype.closeLightbox = function () {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    };
    PhotoContainer.prototype.gotoPrevious = function () {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    };
    PhotoContainer.prototype.gotoNext = function () {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    };
    PhotoContainer.prototype.gotoSelected = function (event, number) {
        this.setState({
            currentImage: number
        });
    };
    PhotoContainer.prototype.render = function () {
        var _this = this;
        var duration = 200;
        var transitionStyles = {
            entering: {
                opacity: 0,
                transition: "opacity " + duration + "ms ease-in-out",
                width: '100%'
            },
            entered: {
                opacity: 1,
                transition: "opacity " + duration + "ms ease-in-out",
                width: '100%'
            },
            exiting: {
                opacity: .8,
                transition: "opacity " + duration + "ms ease-in-out",
                width: '100%'
            },
            exited: {
                opacity: 0,
                transition: "opacity " + duration + "ms ease-in-out",
                width: '100%'
            }
        };
        var items = React.createElement("h1", null);
        if (this.props.album.length !== 0 && this.props.selected) {
            items = this.props.album.photos.map(function (photo, index) {
                if (index < 1) {
                    return React.createElement("div", { className: 'photo-container-medium', key: photo.id },
                        React.createElement("img", { onClick: _this.openLightbox, className: 'img', src: "/imgs/" + photo.src + ".jpg" }));
                }
            });
        }
        return (React.createElement(Transition_1.default, { in: true, timeout: duration, unmountOnExit: true, mountOnEnter: true, appear: true }, function (state) {
            return React.createElement("div", { style: transitionStyles[state] },
                items,
                _this.props.selected
                    ?
                        React.createElement("div", { className: 'album-info' },
                            React.createElement("p", { className: 'small-text album-description' }, _this.props.album.description),
                            React.createElement("p", null, _this.props.album.date),
                            React.createElement(Lightbox, { photos: _this.props.album.photos, isOpen: _this.state.lightboxIsOpen, onClose: _this.closeLightbox, gotoPrevious: _this.gotoPrevious, gotoNext: _this.gotoNext, gotoSelected: _this.gotoSelected, currentImage: _this.state.currentImage }))
                    :
                        null);
        })
        /* <Lightbox images={this.props.album.photos}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
        /> */
        );
    };
    return PhotoContainer;
}(React.Component));
var Lightbox = /** @class */ (function (_super) {
    __extends(Lightbox, _super);
    function Lightbox(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            rendered: true
        };
        return _this;
    }
    Lightbox.prototype.componentDidMount = function () {
        var _this = this;
        setTimeout(function () {
            _this.setState({
                rendered: true
            });
        }, 3000);
    };
    Lightbox.prototype.componentWillUnmount = function () {
        this.setState({
            rendered: false
        });
    };
    Lightbox.prototype.render = function () {
        var img = "/imgs/" + this.props.photos[this.props.currentImage].src + ".jpg";
        {
            return this.props.isOpen
                ?
                    React.createElement("div", { className: 'lightbox-wrapper', scroll: "no" },
                        React.createElement("div", { className: 'lightbox-title-wrapper' },
                            React.createElement(icons_1.PhotoIcon, { styles: this.state.rendered
                                    ?
                                        'svg-icon lightbox-icon-show'
                                    :
                                        'svg-icon lightbox-icon' }),
                            React.createElement(icons_1.X, { styles: 'aline' })),
                        React.createElement("div", { className: 'lightbox-photo-wrapper', onClick: this.props.onClose },
                            React.createElement("img", { className: 'lightbox-img', src: img, id: this.props.currentImage })),
                        React.createElement(DotBox, { photos: this.props.photos, gotoSelected: this.props.gotoSelected, currentImage: this.props.currentImage }))
                :
                    null;
        }
    };
    return Lightbox;
}(React.Component));
function DotBox(props) {
    var style = {
        background: '#ff6347'
    };
    return (React.createElement("div", { className: 'dot-box-wrapper' }, props.photos.map(function (photo, index) {
        return (React.createElement("div", { className: 'lightbox-dot', key: index, onClick: function (event) { return props.gotoSelected(event, index); }, style: index === props.currentImage
                ?
                    style
                :
                    null }));
    })));
}
var mapStateToProps = function (state) {
    return {
        blinds: state.all.blinds,
        albums: state.all.albums
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        toggleBlinds: function (id, isOpen) { return dispatch(actions_1.toggleBlinds(id, isOpen)); },
        getPhotos: function () { return dispatch(actions_1.fetchPhotos()); }
    };
};
var BlindsAction = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Blinds);
exports.default = BlindsAction;
//# sourceMappingURL=blinds.js.map