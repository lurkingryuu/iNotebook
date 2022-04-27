import React, { useContext, useRef } from 'react';
import AlertContext from '../context/alert/AlertContext';
import NoteContext from '../context/notes/NoteContext';

function Modal(props) {
    const {note, setNote, reference} = props;
    const refClose = useRef(null);

    const context = useContext(NoteContext);
    const { editNote } = context;
    const {showAlert} = useContext(AlertContext);


    const handleSubmit = (e)=>{
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click()        
        showAlert("Note Updated", 'success');
    }
    const onChange = (event)=>{
        setNote({...note, [event.target.name]: event.target.value})
    }

    return (
        <div className='Modal'>
            <button ref={reference} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Title</label>
                            <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="edescription" className="form-label">Description</label>
                            <textarea type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} rows="4" value={note.edescription}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="etag" className="form-label">Tags</label>
                            <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag}/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.etitle.length<3 || note.edescription.length<10 ? true:false} type="button" className="btn btn-primary" onClick={handleSubmit} >Update Note</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Modal;