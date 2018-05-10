import * as React from "react";
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Transition from 'react-transition-group/Transition';

interface Mock {
    id:number;
    content:string;
    selected:boolean;
}

const data = [
    {
        id: 1,
        content: "a",
        selected: false
    },
    {
        id: 2,
        content: "b",
        selected: false
    },
    {
        id: 3,
        content: "c",
        selected: false
    },
    {
        id: 4,
        content: "d",
        selected: false
    },
    {
        id: 5,
        content: "e",
        selected: false
    }
]
export default class Blinds extends React.Component {
    state: {
        blinds:Mock[];
        active:boolean;
    }


    constructor(props) {
        super(props);
        this.state = {
            blinds: data,
            active: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.revert = this.revert.bind(this);
    }

    handleClick(id, e) {
        e.preventDefault();
        console.log('clicked')
        let freeze = this.state.blinds;
        for (let i = 0; i < freeze.length; i++) {
            for (let k in freeze[i]) {
                if (freeze[i].id !== id) {
                    freeze[i].selected = false;
                } else {
                    freeze[i].selected = true;
                }
            }
        }
        this.setState({
            active: true,
            blinds: freeze
        });
    }

    revert(e) {
        e.preventDefault();
        this.setState({
            blinds: [
                {
                    id: 1,
                    content: "a",
                    selected: false
                },
                {
                    id: 2,
                    content: "b",
                    selected: false
                },
                {
                    id: 3,
                    content: "c",
                    selected: false
                },
                {
                    id: 4,
                    content: "d",
                    selected: false
                },
                {
                    id: 5,
                    content: "e",
                    selected: false
                }
            ],
            active: false
        });
    }

    render() {
        let blinds = this.state.blinds.map(data => {
            return (
                <Blind 
                    key = { data.id }
                    number = { data.id }
                    active = { this.state.active }
                    selected = { data.selected }
                    content = { data.content }
                    onClick = { e => this.handleClick(data.id, e) }
                    />
                );
    });

        return(
            <div className = "page-wrapper" >
                { blinds }
                < button onClick = { this.revert } > revert </button>
            </div>
        );
    }
}

class Blind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            off: {
                opacity: "0",
                transition: "1000ms",
                height: "0px",
            },
            selected: {
                transition: "1000ms",
                top: "0"
            },
        };
    }

    render() {
        let baseStyle = "wrapper";
        this.props.number % 2 === 0
            ? (baseStyle = "wrapper")
            : (baseStyle = "wrapper-flip");

        let activeStyle = null;
        if (this.props.active) {
            console.log('render props active')
            this.props.selected ? activeStyle = this.state.selected : activeStyle = this.state.off;
        }            
    
        return (
            <div
                className= { baseStyle }
                style = { activeStyle }
                onClick = { this.props.onClick }
                >
                <h1>{ this.props.content } </h1>
            </div>
        );
    }
}
