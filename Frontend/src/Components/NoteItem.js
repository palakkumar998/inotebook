import React, { useContext } from 'react'
import NoteContext from '../Context/notes/NoteContext';

function NoteItem(props) {
    const context = useContext(NoteContext);
    const { deletNote } = context;
    const { note, updateNote } = props;
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3" style={{ width: "18" }}>
                    <div className="card-body">
                        <i className="fa-solid fa-notebook"></i>
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fa-solid fa-pen-to-square mx-3" onClick={() => {
                            updateNote(note)
                        }} ></i>
                        <i className="fa-solid fa-delete-left" onClick={() => {
                            deletNote(note._id); props.showAlert("Your Note has been deleted successfully", "success");
                        }}  ></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem;