import React from 'react'

function NoteItem(props) {
    const { note } = props;
    return (
        <>
            {note.title} <br />
            {note.description}
        </>
    )
}

export default NoteItem;