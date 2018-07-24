import * as React from 'react';




export function About(props) {
    return (
        <div className = "about">
            {/* <Photo />
            <Menu />
            <Text /> */}
        </div>
    )
}


export function Photo(props) {
    
}


export function DotToggle(props) {
    if (props.open) 
        return <div className='small-dot'/>
    else 
        return <div className='no-dot'/>
}


