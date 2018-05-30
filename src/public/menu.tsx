import * as React from "react";
import Dial from './dial-menu'
import { 
    Hamburger,
    Home,
    CurrentWork,
    About,
    Repository,
} from './svg/icons'
// import {
//     Route,
//     Link,
//     BrowserRouter,
//     Redirect,
//     Switch
// } from 'react-router-dom';
import Measure from 'react-measure'; 


export default class HamburgerMenu extends React.Component {
    state: any;
    constructor(props) {
        super(props)
        this.state = {
            isClosed:true,
            risClosed:true
        }
        this.openMenu = this.openMenu.bind(this);
        this.rightOpenMenu = this.rightOpenMenu.bind(this);
        this.scrollLock = this.scrollLock.bind(this);
    }

    openMenu(e) {
        e.preventDefault()
        this.setState({
            isClosed:!this.state.isClosed
        }, () => {
            if (this.state.isClosed) {
                this.setState({
                    risClosed:true
                })
                this.scrollUnlock();
            } else {
                this.scrollLock();
            }
        })
    }

    rightOpenMenu(e) {
        e.preventDefault()
        this.setState({
            risClosed:!this.state.risClosed
        })
    }

    scrollLock() {
        document.body.classList.add('scroll-lock')
    }

    scrollUnlock() {
        document.body.classList.remove('scroll-lock')
    }


    render() {
        return (
            <div>
                <div className = {this.state.isClosed?null:"curtain"} onClick = {this.openMenu}></div>
                <Hamburger
                    openMenu={this.openMenu}
                    class={
                        this.state.isClosed
                            ?
                            "menu-svg"
                            :
                            "menu-svg open"
                    }
                />
                <div className = {
                    this.state.isClosed
                    ?
                    'left-menu-wrapper'
                    :
                    'left-menu-wrapper menu-open'
                    }
                    >
                    {/* <BrowserRouter > */}
                        <div className = 'menu-icons-wrapper'>
                            <Home class = {"menu-icons current-menu-icon"}/>
                            <Repository class={"menu-icons"} onClick = {this.rightOpenMenu}/>
                            <About class={"menu-icons"} />
                            <CurrentWork class={"menu-icons skinny-stroke"} />
                        </div>
                    {/* </BrowserRouter> */}
                </div>
                <div className={
                    this.state.risClosed
                        ?
                        'right-menu-wrapper'
                        :
                        'right-menu-wrapper menu-open'
                    }
                    >
                    <Dial />
                </div>
            </div>
        )
    }
}