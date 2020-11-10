import React from 'react';

type Button = {
    copyHandler: () => void
}

const CopyButton = ({ copyHandler }: Button) => {

    return (
        <button onClick={
            copyHandler
        }
        >Copy</button>
    )
}

export default CopyButton