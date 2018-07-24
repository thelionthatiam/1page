import * as React from "react";
import Dial from './dial-menu'
import { 
    Hamburger,
    Home,
    CurrentWork,
    About,
    Repository,
    AFrameIcon
} from './svg/icons'
// import {
//     Route,
//     Link,
//     BrowserRouter,
//     Redirect,
//     Switch
// } from 'react-router-dom';
import Measure from 'react-measure'; 

interface HamburgerMenuState {
    isClosed: boolean;
    risClosed: boolean;
}

export default class HamburgerMenu extends React.Component {
    constructor(props) {
        super(props)
        this.openMenu = this.openMenu.bind(this);
        this.rightOpenMenu = this.rightOpenMenu.bind(this);
        this.scrollLock = this.scrollLock.bind(this);
    }

    public readonly state : HamburgerMenuState = {
        isClosed: true,
        risClosed: true
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
                            <a href = '/about'><About class={"menu-icons"} /></a>
                            {/* <a href= '/current'><AFrameIcon styles={"menu-icons aFrame"} /></a> */}
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