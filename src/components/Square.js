import React from 'react'

export default function Square(props) {
    return (<div
        className={`square ${props.square.isLocked === true ? 'green' : null}`} 
        onClick={(e) => props.lockSquare(e, props.index)}
    >
        <h2>{props.square.value}</h2>
    </div>)
}