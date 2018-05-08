import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import NothingHere from './little-components/nothing-here'
import { connect, Provider } from 'react-redux';

import { fetchPhotos } from './actions'

interface Photo {
    id: string;
    album_uuid: string;
    photo_uuid: string;
    photo: string;
}

interface Album {
    id: string;
    title: string;
    date: string;
    description: string;
    album_uuid: string;
    photos?: Photo[];
}

class PhotoContainer extends React.Component {
    props: {
        getPhotos:() => Object;
        albums:Album[];
    }
    constructor(props) {
        super(props)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {
        this.props.getPhotos()
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
        let items = <h1>nothing here yet!</h1>
        if (this.props.albums.length !== 0) {
            items = this.props.albums.map((item) => {
                return <div
                    key={item.id}
                    title={item.title}
                >
                    <p>{item.title}</p>
                    <p>{item.date}</p>
                    <p>{item.description}</p>
                    <p>{item.album_uuid}</p>
                    { 
                        item.photos.length > 0 ?

                            item.photos.map((item) => {
                            return <div
                                key={item.id}>
                                <p>{item.photo}</p>
                                <img src={"/imgs/" + item.photo + ".jpg"}/>
                            </div>
                        }):
                        null
                    };
                    
                </div>
            })
        }

        return (
            <div>
                <div >
                    <h1>hello photo world</h1>
                    <form action='/photos' method="get">
                        <button type="submit">get photos</button>
                    </form>
                </div>
                <Transition
                    in={true}
                    timeout={duration}
                    unmountOnExit={true}
                    mountOnEnter={true}
                    appear={true}>
                    {state =>
                        <div style={transitionStyles[state]}>
                            {items}
                        </div>
                    }
                </Transition>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
       albums: state.all.albums// this data structure needs to happen
    }
}

const mapDispatchToProps = dispatch => {
    return {
       getPhotos: () => dispatch(fetchPhotos())
    }
}

const Photos = connect(
    mapStateToProps,
    mapDispatchToProps
)(PhotoContainer)


export default Photos;