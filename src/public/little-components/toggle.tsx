import * as React from 'react';

export default class Toggler extends React.Component {
    state: {
        togglerStyle:string;
        wrapperStyle:string;

    }

    props: {
        toggleActive:any;
        alarm:any;
    }


    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        console.log(this.props.alarm.active)
        this.props.toggleActive({
            active:this.props.alarm.active,
            alarm_uuid: this.props.alarm.alarm_uuid
        })
    }
    


    render() {
        let togglerStyle = "toggler";
        let wrapperStyle = "toggle-wrapper";
        if (this.props.alarm.active) {
            togglerStyle = "toggler toggler-on";
            wrapperStyle = "toggle-wrapper toggle-on";
        }
        return (
            <div>
                <div className = {wrapperStyle} onClick = {this.handleSubmit}>
                    <div className = {togglerStyle}></div>
                </div>
            </div>
        )
    }
}