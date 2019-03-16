import React from 'react';

function Square(props) {
    const {value, onClick} = props;

    return (
        <button
            className="square"
            onClick={onClick}>
            {value}
        </button>
    );
}

export default Square;