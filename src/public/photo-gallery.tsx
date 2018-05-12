import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import Gallery from 'react-photo-gallery';
import * as React from 'react';
import Lightbox from 'react-images';
import Measure from 'react-measure';
import { connect, Provider } from 'react-redux';

const photos = [
    { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799', width: 1, height: 1 },
    { src: 'https://source.unsplash.com/qDkso9nvCg0/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/iecJiKe_RNg/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/zh7GEuORbUw/600x799', width: 3, height: 4 },
    { src: 'https://source.unsplash.com/PpOHJezOalU/800x599', width: 4, height: 3 },
    { src: 'https://source.unsplash.com/I1ASdgphUH4/800x599', width: 4, height: 3 }
];

class PhotoGallery extends React.Component {
    constructor() {
        super();
        this.state = { width: -1 };
    }
    render() {
        const width = this.state.width;
        console.log('photogallery', this.props)
        if (this.props.blinds.active) {
            return (
                <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
                    {
                        ({ measureRef }) => {
                            if (width < 1) {
                                return <div ref={measureRef}></div>;
                            }
                            let columns = 1;
                            if (width >= 480) {
                                columns = 2;
                            }
                            if (width >= 800) {
                                columns = 3;
                            }
                            if (width >= 1000) {
                                columns = 4;
                            }
                            return <div ref={measureRef}><Gallery photos={photos} columns={columns} /></div>
                        }
                    }
                </Measure>
            )
        } else {
            return (<h1>blinds are closed</h1>)
        }
    }
}

const mapStateToProps = state => {
    return {
        blinds: state.all.blinds// this data structure needs to happen
    }
}

const PhotoGalleryActions = connect(
    mapStateToProps
)(PhotoGallery)


export default PhotoGalleryActions;
