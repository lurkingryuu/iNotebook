import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import AlertContext from '../context/alert/AlertContext';

function Noteitem(props) {
    const context = useContext(NoteContext);
    const {showAlert} = useContext(AlertContext);
    const { deleteNote } = context;
    const {note, updateNote} = props;

    const removeNote = (id)=>{
        deleteNote(id);
        showAlert("The Note has been deleted", 'success');
    }
    return (
        <div className='Noteitem col-md-3'>
            <div className="card my-3" >
                <div className="card-body">
                    <div className="d-flex align-items-centre">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash-can mx-2" onClick={()=>{ removeNote(note._id) }} />
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{ updateNote(note) }} />              
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Noteitem;