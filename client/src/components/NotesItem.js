import React,{useContext} from 'react';
import noteContext from '../context/notes/NoteContext';

const NotesItem = (props) => {
    const {notes,update} = props;
    const context = useContext(noteContext);
    const {deleteNote,showAlert} = context;


    return (
        <div className='col-md-3 my-3'>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{notes.title}</h5>
                    <p className="card-text">{notes.description}</p>
                <i className="fa-solid fa-trash mx-1" onClick={(()=>{
                    if(window.confirm("Are you Sure you Want to Delete this Note!!!")){
                        deleteNote(notes._id);
                        showAlert("Note Deleted Successfull","danger")
                    }
                   })}></i>
                <i className="fa-solid fa-pen-to-square mx-1" onClick={(()=>{update(notes)})}></i>
                </div>
            </div>

        </div>
    )
}

export default NotesItem
