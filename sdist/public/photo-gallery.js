"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_photo_gallery_1 = require("react-photo-gallery");
const React = require("react");
const react_measure_1 = require("react-measure");
const react_redux_1 = require("react-redux");
const photos = [
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
class PhotoGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: -2 };
    }
    componentDidMount() {
        this.setState({
            width: 0
        });
    }
    render() {
        const width = this.state.width;
        let selectedAlbum = this.props.albums.filter(album => album.selected);
        function thingy(photo) {
            if (selectedAlbum.length > 0) {
                return parseInt(selectedAlbum[0].id) === photo.album_id;
            }
        }
        let renderPhotos = photos.filter(thingy);
        console.log('r photos', renderPhotos);
        if (this.props.blinds.active) {
            return (React.createElement(react_measure_1.default, { bounds: true, onResize: (contentRect) => this.setState({ width: contentRect.bounds.width }) }, ({ measureRef }) => {
                console.log('measure ref', width);
                if (width + 1 < 1) {
                    return React.createElement("div", { ref: measureRef });
                }
                let columns = 1;
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
    }
}
const mapStateToProps = state => {
    return {
        blinds: state.all.blinds,
        albums: state.all.albums
    };
};
const PhotoGalleryActions = react_redux_1.connect(mapStateToProps)(PhotoGallery);
exports.default = PhotoGalleryActions;
//# sourceMappingURL=photo-gallery.js.map