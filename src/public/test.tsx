import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';
import NothingHere from './little-components/nothing-here';
import ResponsiveEmbed from 'react-responsive-embed'
import { connect, Provider } from 'react-redux';

import { fetchTestData } from './actions'

class NewTest extends React.Component {


    constructor(props) {
        super(props)
    }
    

    render() {
       
        return (
            <div>
                <h1>hello react world</h1>
                <div style = {{width:'50vw'}}>
                    <ResponsiveEmbed src='https://www.youtube.com/embed/2yqz9zgoC-U' allowFullScreen />
                </div>
            </div>
            
        )
    }    
}

const mapStateToProps = state => {
}

const mapDispatchToProps = dispatch => {
}

const TestApp = connect(
    mapStateToProps, 
    mapDispatchToProps
)(NewTest)




export { TestApp };