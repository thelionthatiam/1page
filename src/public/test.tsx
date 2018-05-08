import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import NothingHere from './little-components/nothing-here'
import { connect, Provider } from 'react-redux';

import { fetchTestData } from './actions'

class NewTest extends React.Component {
    props: {
        test: [{
            id: string;
            title: string;
            uuid: string;
            test_uuid: string;
        }]
        getTestData:() => props.items
    }
    

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    
    componentDidMount() {
        this.props.getTestData()
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handlesubmit', this.props.getTestData())
        this.props.getTestData()

    }

    render() {
        console.log(this.props.test, this.props.test.length)
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
        if (this.props.test.length !== 0) {
            items = this.props.test.map((item) => {
                return <div
                    key={item.id}
                    title={item.test}
                >
                    <p>{item.id}</p>
                    <p>{item.test}</p>
                    <p>{item.test_uuid}</p>
                    <p>{item.date}</p>
                </div>
            })
        }
       
        return (
            <div>
                <div >
                    <h1>hello react world</h1>
                    <form action='/test' method="post">
                        <input type='text' />
                        <button type="submit">test</button>
                    </form>
                </div>
                <div >
                    <button onClick={this.handleSubmit}>test</button>
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
        test:state.test.test
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTestData: () => dispatch(fetchTestData())
    }
}

const TestApp = connect(
    mapStateToProps, 
    mapDispatchToProps
)(NewTest)




export { TestApp };