import React from 'react';

type Props = {
    text: string,
    clickHandler: () => void
}

const Button = (props: Props) => {

    return (
        <button onClick={props.clickHandler}>
            {props.text}
        </button>
    )
}

export default Button