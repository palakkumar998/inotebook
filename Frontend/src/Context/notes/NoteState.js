import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    // ! static json
    const notesInitial =
        [
            {
                "_id": "644fb2be24df44bf9d30cb4",
                "user": "644be96fa92444f35013b160",
                "title": "updated list items ",
                "description": "all are purchased in time",
                "tag": "completed",
                "date": "2023-05-01T12:38:22.425Z",
                "__v": 0
            },
            {
                "_id": "6453cf7742d2b105457ec2",
                "user": "644be96fa92444f35013b160",
                "title": "About my app 1",
                "description": "your react application is running ",
                "tag": "React",
                "date": "2023-05-04T15:29:52.886Z",
                "__v": 0
            },
            {
                "_id": "6453cf707420d205457ec2",
                "user": "644be96fa92444f35013b160",
                "title": "About my app 2",
                "description": "your react application is running ",
                "tag": "React",
                "date": "2023-05-04T15:29:52.886Z",
                "__v": 0
            }

        ]
    const [notes, setNotes] = useState(notesInitial);

    // ? CRUD operation
    // * Add a note:
    const addNote = (title, description, tag) => {

        // todo-> API call (add into database also):
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
    const editNote = () => {
        // todo-> API call (upate in database also):

    }



    return (
        // ? this is a parent provider:
        // ? make CRUD as part of NoteContext :
        <NoteContext.Provider value={{ notes, setNotes, addNote, deletNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;