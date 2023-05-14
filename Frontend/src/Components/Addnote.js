import React, { useContext, useState } from 'react'
import NoteContext from '../Context/notes/NoteContext';

function Addnote() {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    const clickHandle = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
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
                        <input type="text" className="form-control" id="title" name='title' placeholder='enter your title here' onChange={onChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description"  placeholder='enter your description here' onChange={onChange} name='description' />
                    </div>
                    <div className="mb-3" style={{ width: "20rem" }} >
                        <label htmlFor="tag" className="form-label" >Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag'  placeholder= 'Example:-office' onChange={onChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                    </div>

                    <button type="submit" onClick={clickHandle} className="btn btn-primary">Add Note</button>
                </form>
            </div>
        </>
    )
}

export default Addnote