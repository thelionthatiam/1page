import * as React from 'react';
import * as ReactDOM from 'react-dom';


class Tester extends React.Component {
    constructor(props) {
        super(props)

        this.user = this.props.userData
    }

    render() {
        console.log(this.props)
        return(
            <div>
                <p>this is a test that originates from react, with a little sauce</p>
                <div><pre>{JSON.stringify(this.user, null, 2) }</pre></div>
            </div>
        )
    }
}

function test() {
    return ReactDOM.render(<Tester/>,document.getElementById('root'));
}

export default Tester