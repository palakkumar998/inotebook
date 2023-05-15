import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const host = " http://localhost:5000";

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

    //????????????????????????? CRUD operation ?????????????????????????????????//
    // * Adding a note:
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


        // * concat notes with note:
        const note = await response.json();
        setNotes(notes.concat(note))

    }
    //***************************** Deleting a note***************************//
    const deletNote = async (id) => {
        // todo-> API call (delete from database also):
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YmU5NmZhOTI0NDRmMzUwMTNiMTYwIn0sImlhdCI6MTY4MjY5NjU4OH0.G9A0Cn54i_z7ImorTU0CU5_eB1TeDwvT-RlHqWgQZ7g"
            }
        });

        const json = await response.json();
        console.log(json);

        // * Deleting Logic using Filter:
        // console.log("deleted not id is:", id);
        const deleted = await notes.filter((note) => {
            // eslint-disable-next-line no-lone-blocks
            { return note._id !== id }
        })
        setNotes(deleted)
    }


    //**************************************Edit a note****************************************//
    const editNote = async (id, title, description, tag) => {
        // todo-> API call (upate in database also):
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ0YmU5NmZhOTI0NDRmMzUwMTNiMTYwIn0sImlhdCI6MTY4MjY5NjU4OH0.G9A0Cn54i_z7ImorTU0CU5_eB1TeDwvT-RlHqWgQZ7g"
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        // ? logic to edit in DB:
        let newNotes = await JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < notes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;

            }
        }
        setNotes(newNotes)
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