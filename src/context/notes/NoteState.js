import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notes_api = "http://localhost:3001/api/notes/";

  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    const response = await fetch(`${notes_api}fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${notes_api}addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    const note = await response.json();
    
    setNotes(notes.concat(note));
  };

  // Delete note
  const deleteNote = async (id) => {
    // eslint-disable-next-line
    const response = await fetch(`${notes_api}deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      }
    });

    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };

  // Edit note
  const editNote = async (id, title, description, tag) => {
    // eslint-disable-next-line
    const response = await fetch(`${notes_api}updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
