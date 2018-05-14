import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import Gallery from 'react-photo-gallery';
import * as React from 'react';
import Lightbox from 'react-images';
import Measure from 'react-measure';
import { connect, Provider } from 'react-redux';

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
    constructor() {
        super();
        this.state = { width: -2 };
    }
    componentDidMount() {
        this.setState({
            width:0
        })
    }
    render() {
        const width = this.state.width;
        let selectedAlbum = this.props.albums.filter(album => album.selected)
        function thingy(photo) {
            if (selectedAlbum.length > 0) {
                return parseInt(selectedAlbum[0].id) === photo.album_id
            } 
        }
        let renderPhotos = photos.filter(thingy)
        console.log('r photos', renderPhotos)

        if (this.props.blinds.active) {
            return (
                <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
                    {
                        ({ measureRef }) => {
                            console.log('measure ref', width)
                            if (width + 1 < 1) {
                                return <div ref={measureRef}></div>;
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
                            return <div ref={measureRef}><Gallery 
                            photos={renderPhotos} 
                            columns={columns}
                            /></div>
                        }
                    }
                </Measure>
            )
        } else {
            return (<h1></h1>)
        }
    }
}

const mapStateToProps = state => {
    return {
        blinds: state.all.blinds, 
        albums: state.all.albums
    }
}

const PhotoGalleryActions = connect(
    mapStateToProps
)(PhotoGallery)


export default PhotoGalleryActions;
