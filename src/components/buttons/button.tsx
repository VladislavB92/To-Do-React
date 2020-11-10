import React from 'react';
import './button.css';

type Props = {
    text: string,
    clickHandler: () => void
}

const Button = (props: Props) => {

    return (
        <button
            className="button"
            onClick={props.clickHandler}>
            {props.text}
        </button>
    )
}

export default Button