import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

class NewTest extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }


    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div >
               <h1>hello react world</h1>
            </div>
        )
    }    
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {    }
}

const TestApp = connect(
    mapStateToProps, 
    mapDispatchToProps
)(NewTest)




export { TestApp };