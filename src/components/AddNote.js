import React, { useContext, useState } from 'react';
import AlertContext from '../context/alert/AlertContext';
import NoteContext from '../context/notes/NoteContext';

function AddNote() {
    const context = useContext(NoteContext);
    const {showAlert} = useContext(AlertContext);

    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleSubmit = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        showAlert("The Note Has been Added" , "success");
    }
    const onChange = (event)=>{
        setNote({...note, [event.target.name]: event.target.value})
    }

    return (
        <div className='AddNote'>
            <h2 className='my-3'>Add a note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea type="text" className="form-control" id="description" name="description" onChange={onChange} rows="4" value={note.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
                </div>
                <button disabled={note.title.length<3 || note.description.length<10 ? true:false} type="submit" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
            </form>
        </div>
    );
}

export default AddNote;