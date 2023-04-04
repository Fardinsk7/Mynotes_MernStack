import React,{useState,useContext} from 'react';
import noteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote,showAlert} =context;
    const[note,setNote] = useState({title:"",description:"",tags:""})

    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title.toString(),note.description.toString(),note.tags.toString())
        setNote({title:"",description:"",tags:""})    
        showAlert("Note Added Successfully","success")    
    }

    const onChange = (e)=>{
        setNote({...note,[e.target.name]:[e.target.value]})
    }

  return (
    <div>
       <h1>Add Note:</h1>
      <form className='my-3' onSubmit={handleClick}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} value={note.title} required />
        </div>
        <div className="form-group my-3">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" id="description" value={note.description} name="description" placeholder="Enter Description" onChange={onChange} required />
        </div>
        <div className="form-group my-3">
        <label htmlFor="tags">Tags</label>
          <input type="text" className="form-control" id="tags" name="tags" value={note.tags} placeholder="Enter Description" onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary my-3" >Add Note</button>
      </form>
    </div>
  )
}

export default AddNote
