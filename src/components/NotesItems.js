import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NotesItems = (props) => {
    const {note, updatenote} = props;
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    return (
        <div className="col-md-3 my-2">
            <div className="card" >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">{note.tag}</p>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
                        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    </div>
            </div>
        </div>
    )
}

export default NotesItems