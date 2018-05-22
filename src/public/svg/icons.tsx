import * as React from 'react';

export function PhotoIcon(props) {

    return (
        <svg className={props.styles} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 479.04 415.75">
            <title>photos-icon</title>
            <polyline className = 'aline' points="7.94 204.88 240.52 340.7 473.1 204.88" />
            <polyline  points="7.94 275.88 240.52 411.7 473.1 275.88" />
            <polygon  points="6.94 139.88 239.52 4.05 472.1 139.88 239.52 275.7 6.94 139.88" />
        </svg>
    )
}

export function X(props) {
    return (
        <svg className={props.styles} viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <line 
                x1="1" 
                y1="11"
                x2="11" 
                y2="1" 
                />
            <line 
                x1="1" 
                y1="1"
                x2="11" 
                y2="11" 
                />
        </svg>
    )
}

//479.04 415.75