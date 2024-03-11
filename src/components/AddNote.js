import React, {useContext, useState} from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
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
                    <input type="text" className="form-control" placeholder="Enter Title Here" id="title" name='title' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" placeholder="Enter Note Here" id="description" name='description' style={{ "height": "200px" }} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" placeholder="Enter Tag Here" id="tag" name='tag' onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}><i className="fa-solid fa-plus"></i>Add Note</button>
            </form>
        </>
    )
}

export default AddNote