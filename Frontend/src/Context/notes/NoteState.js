import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    // ! static json
    const notesInitial =
        [
            {
                "_id": "644fb2be243df44bf9d30cb4",
                "user": "644be96fa92444f35013b160",
                "title": "updated list items ",
                "description": "all are purchased in time",
                "tag": "completed",
                "date": "2023-05-01T12:38:22.425Z",
                "__v": 0
            },
            {
                "_id": "6453cf77420d2b105457ec2",
                "user": "644be96fa92444f35013b160",
                "title": "About my app 1",
                "description": "your react application is running ",
                "tag": "React",
                "date": "2023-05-04T15:29:52.886Z",
                "__v": 0
            },
            {
                "_id": "6453cf707420d2b05457ec2",
                "user": "644be96fa92444f35013b160",
                "title": "About my app 2",
                "description": "your react application is running ",
                "tag": "React",
                "date": "2023-05-04T15:29:52.886Z",
                "__v": 0
            },
            {
                "_id": "6453cf707420d2b10457ec2",
                "user": "644be96fa92444f35013b160",
                "title": "About my app 3",
                "description": "your react application is running ",
                "tag": "React",
                "date": "2023-05-04T15:29:52.886Z",
                "__v": 0
            }
        ]
    const [notes, setNotes] = useState(notesInitial);


    return (
        // ? this is a parent provider 
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )

}
export default NoteState;