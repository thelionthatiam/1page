import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { populate } from './actions/user-data'

// class Tester extends React.Component {
//     user: any;
//     props: any;
    

//     constructor(props) {
//         super(props)

//         this.user = this.props.userData
//     }
//     render() {
//         console.log(this.props)
//         return(
//             <div>
//                 <p>this is a test that originates fasdg;lkajndkg a little sauce</p>
//                 <div><pre>{JSON.stringify(this.user, null, 2) }</pre></div>
//             </div>
//         )
//     }
// }
// <div><pre>{JSON.stringify({userData}, null, 2)}</pre></div>
const Test = ({userData, populate}) => {
    console.log('test component', userData, populate)
    return (
        <div>
            <p>THIS IS A TEST TO SEE IF STATE CAN COME FROM REDUX</p>    
            <p>{userData}</p>
            <button onClick = {populate}>get user data</button>
        </div>
    )
}

const mapStateToProps = state => {
    console.log('map state to porps')
    return {
        userData: state.populateUserData.userData
    }
}

const mapDispatchToProps = dispatch => {
    console.log('map dispatch')
    return {
        populate: () => dispatch(populate())
    }
}

const TestApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(Test)



export { TestApp };
