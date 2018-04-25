import * as React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';

export default class NothingHere extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let duration = 200;

        let defaultStyle = {
            transition: `opacity ${duration}ms ease-in-out`,
            opacity: 0,
        }

        let transitionStyles = {
            entering: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            entered: {
                opacity: .3,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            exiting: {
                opacity: .1,
                transition: `opacity ${duration}ms ease-in-out`,
            },
            exited: {
                opacity: 0,
                transition: `opacity ${duration}ms ease-in-out`,
            }
        };

        return (
            <div className='centerColumn'>
                <Transition
                    in={true}
                    timeout={duration}
                    unmountOnExit={true}
                    mountOnEnter={true}
                    appear={true}
                >

                    {state => {

                        switch (state) {
                            case 'entering':
                                return <h1 style={transitionStyles[state]}>nothing here, add below</h1>;
                            case 'entered':
                                return <h1 style={transitionStyles[state]}>nothing here, add below</h1>;
                            case 'exiting':
                                return <h1 style={transitionStyles[state]}>nothing here, add below</h1>;
                            case 'exited':
                                return <h1 style={transitionStyles[state]}>nothing here, add below</h1>;
                        }
                    }}
                </Transition>
            </div>
        )
    }
}

