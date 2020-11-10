import React from 'react';

type Button = {
    deleteHandler: () => void
}

const DeleteButton = ({ deleteHandler }: Button) => {

    return (
        <button onClick={
            deleteHandler
        }
        >Delete</button>
    )
}

export default DeleteButton