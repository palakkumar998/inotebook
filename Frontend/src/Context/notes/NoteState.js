import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = " http://localhost:5000";
    // ! static json
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    // * get all notes:
    const getNotes = async (title, description, tag) => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YmU5NmZhOTI0NDRmMzUwMTNiMTYwIn0sImlhdCI6MTY4MjY5NjU4OH0.G9A0Cn54i_z7ImorTU0CU5_eB1TeDwvT-RlHqWgQZ7g"
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json)
    }

    // ? CRUD operation
    // * Add a note:
    const addNote = async (title, description, tag) => {

        // todo-> API call (add into database also):
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YmU5NmZhOTI0NDRmMzUwMTNiMTYwIn0sImlhdCI6MTY4MjY5NjU4OH0.G9A0Cn54i_z7ImorTU0CU5_eB1TeDwvT-RlHqWgQZ7g"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        console.log("adding a new note");
        const note = {
            "_id": "644fb2be243df44bf9d30cb4",
            "user": "644be96fa92444f35013b160",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2023-05-01T12:38:22.425Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    // * Delete a note:
    const deletNote = (id) => {

        // todo-> API call (delete from database also):
        console.log("deleted not id is:", id);
        const deleted = notes.filter((note) => {
            { return note._id !== id }
        })
        setNotes(deleted)
    }
    //  * Edit a note:
    const editNote = async (id, title, description, tag) => {

        // todo-> API call (upate in database also):
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YmU5NmZhOTI0NDRmMzUwMTNiMTYwIn0sImlhdCI6MTY4MjY5NjU4OH0.G9A0Cn54i_z7ImorTU0CU5_eB1TeDwvT-RlHqWgQZ7g"
            },
            body: JSON.stringify(title, description, tag)
        });
        const json = response.json();

        // ? logic to edit in DB:
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id == id) {
                element.title = title;
                element.description = description;
                element.tag = tag;

            }
        }
    }
    return (
        // ? this is a parent provider:
        // ? make CRUD as part of NoteContext :
        <NoteContext.Provider value={{ notes, setNotes, addNote, deletNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;