import React, { useContext, useEffect, useRef,useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import NotesItem from './NotesItem';
import {useNavigate} from 'react-router-dom'


const Notes = () => {
  const navigate = useNavigate()
  const context = useContext(noteContext)
  const { notes, getAllNotes,editNote,showAlert } = context// eslint-disable-next-line
  const ref = useRef(null)
  const refClose = useRef(null)
  const[note,setNote] = useState({id:"",etitle:"",edescription:"",etags:""})


  //React Bootstrap Code to get Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();

    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])

  const update = (Currentnote)=>{
    ref.current.click()
    setNote({id:Currentnote._id,etitle:Currentnote.title,edescription:Currentnote.description,etags:Currentnote.tags})
  }
  const handleClick=(e)=>{
    e.preventDefault()
    editNote(note.id,note.etitle,note.edescription,note.etags)
    refClose.current.click()
    showAlert("Note Edited Successfully","primary")
}

const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}

  return (
    <>
      <AddNote />
      <Button variant="primary" onClick={handleShow} ref={ref} style={{display:"none"}}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <form className='my-3'>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} placeholder="Enter Description" onChange={onChange} />
        </div>
        <div className="form-group my-3">
        <label htmlFor="tags">Tags</label>
          <input type="text" className="form-control" id="etags" name="etags" placeholder="Enter Description" value={note.etags} onChange={onChange} />
        </div>
        {/* <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add Note</button> */}
      </form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" ref={refClose} onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={handleClick}>
            Edit Note
          </Button>
        </Modal.Footer>
      </Modal>
      



      <div className='row'>
        <h2>Your Notes:</h2>
        {notes.length === 0 && "NO note Available!!!"}
        {notes.map((note) => {
          return <NotesItem notes={note} key={note._id} update={update} />
        })}

      </div>
    </>
  )
}

export default Notes
