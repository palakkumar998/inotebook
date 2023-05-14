import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
        // eslint-disable-next-line
        getNotes()
    }, [])
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "default" });

    const ref = useRef(null)
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        e.preventDefault();
        console.log("updating a note " , note);
    }

    const onChange = (e) => {

        //? {...note} spread operator: 
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    return (
        <>
            <Addnote />

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            < form>
                                <div className="mb-3" style={{ width: "20rem" }} >
                                    <label htmlFor="title" className="form-label" >Note Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} placeholder='enter your title here' onChange={onChange} aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text"></div>
                                </div>
                                <div className="mb-3" >
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} placeholder='enter your description here' onChange={onChange} name='edescription' />
                                </div>
                                <div className="mb-3" style={{ width: "20rem" }} >
                                    <label htmlFor="tag" className="form-label" >Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} placeholder='Example:-office' onChange={onChange} aria-describedby="emailHelp" />
                                    <div id="emailHelp" className="form-text"></div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div >


            <div className="row my-4">
                <h2>Your Notes</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes