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
var react_photo_gallery_1 = require("react-photo-gallery");
var React = require("react");
var react_measure_1 = require("react-measure");
var react_redux_1 = require("react-redux");
var photos = [
    { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3, album_id: 1 },
    { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1, album_id: 1 },
    { src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 3, height: 4, album_id: 1 },
    { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 3, height: 4, album_id: 2 },
    { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 3, height: 4, album_id: 2 },
    { src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3, album_id: 3 },
    { src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4, album_id: 3 },
    { src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 4, height: 3, album_id: 3 },
    { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3, album_id: 3 }
];
var PhotoGallery = /** @class */ (function (_super) {
    __extends(PhotoGallery, _super);
    function PhotoGallery() {
        var _this = _super.call(this) || this;
        _this.state = { width: -2 };
        return _this;
    }
    PhotoGallery.prototype.componentDidMount = function () {
        this.setState({
            width: 0
        });
    };
    PhotoGallery.prototype.render = function () {
        var _this = this;
        var width = this.state.width;
        var selectedAlbum = this.props.albums.filter(function (album) { return album.selected; });
        function thingy(photo) {
            if (selectedAlbum.length > 0) {
                return parseInt(selectedAlbum[0].id) === photo.album_id;
            }
        }
        var renderPhotos = photos.filter(thingy);
        console.log('r photos', renderPhotos);
        if (this.props.blinds.active) {
            return (React.createElement(react_measure_1.default, { bounds: true, onResize: function (contentRect) { return _this.setState({ width: contentRect.bounds.width }); } }, function (_a) {
                var measureRef = _a.measureRef;
                console.log('measure ref', width);
                if (width + 1 < 1) {
                    return React.createElement("div", { ref: measureRef });
                }
                var columns = 1;
                if (width > 480) {
                    columns = 2;
                }
                if (width > 800) {
                    columns = 3;
                }
                if (width > 999) {
                    columns = 4;
                }
                return React.createElement("div", { ref: measureRef },
                    React.createElement(react_photo_gallery_1.default, { photos: renderPhotos, columns: columns }));
            }));
        }
        else {
            return (React.createElement("h1", null));
        }
    };
    return PhotoGallery;
}(React.Component));
var mapStateToProps = function (state) {
    return {
        blinds: state.all.blinds,
        albums: state.all.albums
    };
};
var PhotoGalleryActions = react_redux_1.connect(mapStateToProps)(PhotoGallery);
exports.default = PhotoGalleryActions;
//# sourceMappingURL=photo-gallery.js.map