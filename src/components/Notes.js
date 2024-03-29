import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NotesItems from './NotesItems';
import AddNote from './AddNote';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;
    useEffect(() => {
        // eslint-disable-next-line
        getNotes();
    },[] )
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "" });
    
    const updatenote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
    }

    const handleClick =()=>{
        if(note.etag===""){
            note.etag = "Default";
        }
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click(); 
    }
    
    const handleChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <>
            <AddNote/>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" ref={refClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action=''>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" placeholder="Enter Title Here" id="etitle" value={note.etitle} name='etitle' onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" placeholder="Enter Note Here" id="edescription" value={note.edescription} name='edescription' style={{ "height": "100px" }} onChange={handleChange} minLength={5} required></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" placeholder="Enter Tag Here" id="etag" value={note.etag} name='etag' onChange={handleChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" disabled={note.etitle.length<3 || note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className='container'><h4>
                {notes.length === 0 && "No Notes to display"}
                </h4>
                </div>
                {notes.map((note) => {
                    return <NotesItems key={note._id} updatenote={updatenote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes