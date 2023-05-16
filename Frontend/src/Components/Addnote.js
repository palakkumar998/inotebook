import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext';

function Addnote(props) {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const clickHandle = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note added successfully", "success")
    }

    const onChange = (e) => {

        //? {...note} spread operator: 
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <>
            <div className="container my-4">
                <form>
                    <div className="mb-3" style={{ width: "20rem" }} >
                        <label htmlFor="title" className="form-label" >Note Title</label>
                        <input type="text" className="form-control" id="title" name='title' placeholder='enter your title here' value={note.title} required onChange={onChange} minLength={5} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" placeholder='enter your description here' value={note.description} required onChange={onChange} minLength={5} name='description' />
                    </div>
                    <div className="mb-3" style={{ width: "20rem" }} >
                        <label htmlFor="tag" className="form-label" >Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' placeholder='Example:-office' value={note.tag} required
                            onChange={onChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>

                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" onClick={clickHandle} className="btn btn-primary">Add Note</button>
                </form>
            </div>
        </>
    )
}

export default Addnote