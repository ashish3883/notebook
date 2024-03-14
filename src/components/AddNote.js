import React, {useContext, useState} from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({ title: "", description: "", tag: ""});
    const handleClick =(e)=>{
        e.preventDefault();
        
        if(note.tag===""){
            note.tag = "Default";
        }
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: ""})
    }
    const handleChange=(e)=>{
        setNote({...note, [e.target.name]:e.target.value})
    }
    return (
        <>
            <div className="container my-3 text-center">
                <h2> Add Note </h2>
            </div>
            <form action=''>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" placeholder="Enter Title Here" id="title" value={note.title} name='title' onChange={handleChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" placeholder="Enter Note Here" id="description" value={note.description} name='description' style={{ "height": "200px" }} onChange={handleChange} minLength={5} required ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" placeholder="Enter Tag Here" id="tag" value={note.tag} name='tag' onChange={handleChange} />
                </div>
                <button type="submit" disabled={note.title.length<3 || note.description.length<5} className="btn btn-primary" onClick={handleClick}><i className="fa-solid fa-plus"></i>Add Note</button>
            </form>
        </>
    )
}

export default AddNote