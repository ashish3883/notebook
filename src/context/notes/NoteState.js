import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const allNotes = []
  const [notes, setNotes] = useState(allNotes)

  //Get all Notes
  const getNotes = async() => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMDZmYzU0ZmE1ZTc2Mzk4NDZkMDU3In0sImlhdCI6MTcwOTI4MTYyMX0.fVs4qiD5ybu5n2OnrvIjmgLD4aC0iEgBkdNhHX52YIc"
      }
    });
    const json = await response.json();
    console.log(json)
    setNotes(json);
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMDZmYzU0ZmE1ZTc2Mzk4NDZkMDU3In0sImlhdCI6MTcwOTI4MTYyMX0.fVs4qiD5ybu5n2OnrvIjmgLD4aC0iEgBkdNhHX52YIc"
      },
      body: JSON.stringify({title, description, tag}),
    });
    
    //Logic for add a Note
    const note = {
      "_id": "65e2f4eb530c3sc0asde355df4e3",
      "user": "65e06fc54fa5e7639846d057",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-03-02T09:44:11.136Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMDZmYzU0ZmE1ZTc2Mzk4NDZkMDU3In0sImlhdCI6MTcwOTI4MTYyMX0.fVs4qiD5ybu5n2OnrvIjmgLD4aC0iEgBkdNhHX52YIc"
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = response.json();

    //Logic for Edit Note
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  //Delete a Note
  const deleteNote = async(id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMDZmYzU0ZmE1ZTc2Mzk4NDZkMDU3In0sImlhdCI6MTcwOTI4MTYyMX0.fVs4qiD5ybu5n2OnrvIjmgLD4aC0iEgBkdNhHX52YIc"
      }
    });
    const json = response.json();
    console.log(json)
    //Logic for delete a Note
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;