import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext';
import Modal from './Modal';
import Noteitem from './Noteitem';

function Notes() {
    const context = useContext(NoteContext);
    const history = useNavigate();

    const {notes, getNotes} = context;
    useEffect(()=>{
        if (localStorage.getItem('token'))
            getNotes();
        else history('/login');
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);

    // A state made for editing the note
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})


    const updateNote = (currentNote)=>{
        setNote({id: currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
        ref.current.click();
    }

    return (
        <>
        <Modal reference={ref} label={"Edit Note"} note={note} setNote={setNote}/>
            
        <div className='row my-5'>
            <h2 >View your notes</h2>
            <div className="container">
            {notes.length===0 && "Add a note to view your Notes"}
            </div>
                {notes.map((note)=>{
                    return <Noteitem key={note._id} updateNote={updateNote} note = {note}/>
            })}
        </div>
        </>
    );
}

export default Notes;