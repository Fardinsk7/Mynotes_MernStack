import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = []
  // eslint-disable-next-line
  const [userinfo,setInfo] = useState({name:"",email:""})
  const [notes, setNotes] = useState(notesinitial)
  const [alert,setAlert] = useState(null)
  
  
  const showAlert = (msg,type)=>{
    setAlert({
      msg:msg,
      type:type
    })
    setTimeout(()=>{
      setAlert(null) 
    },1500)
  }

  //Getting UserInfo for Profile
  const getUserinfo = async()=>{
    const response = await fetch(`${host}/api/auth/getuser`,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      }
    })
    const json = await response.json();
    setInfo({name:json.name,email:json.email})
  }












  //Fetch All Notes 
  const getAllNotes = async () => {

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      }
    })
    const json = await response.json();
    // console.log(json)
    setNotes(json)
  }



  //Add Note
  const addNote = async (title, description, tags) => {
    //Server Side Code for addNote.
    // eslint-disable-next-line 
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")

      },
      body: JSON.stringify({ title, description, tags })
    })
    // console.log(json)

    //Client Side Code for addNote
    const note = await response.json();

    setNotes(notes.concat(note))

  }







  //Delete Note
  const deleteNote = async (id) => {
    //Server Side Code
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      }
    })


    //Client Side Code
    const newNote = notes.filter((e) => { return e._id !== id })
    setNotes(newNote)



  }

  //Edit Note
  const editNote = async (id, title, description, tags) => {

    //Server side code to edit note
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")

      },
      body: JSON.stringify({ title, description, tags }) // body data type must match "Content-Type" header
    });
    //   const json =  response.json();

    //Client side Code to edit note
    const newnote = JSON.parse(JSON.stringify(notes))
    //React notes ko directly store nhi kar sakte isliye stringify kar k parse kar store kiya notes state ko newnote me
    // const newnote= notes We can't do like this because notes ko directly store nhi kar sakte hai 
    for (let index = 0; index <= newnote.length; index++) {
      // const element = notes[index]
      if (notes[index]._id === id) {
        newnote[index].title = title;
        newnote[index].description = description;
        newnote[index].tags = tags;
        break;
      }


    }
    // console.log(newnote)
    // console.log(a)
    setNotes(newnote)

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes,alert,showAlert,getUserinfo,userinfo }}>
      {props.children}
      
    </NoteContext.Provider>
  )
}

export default NoteState