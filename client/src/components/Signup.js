import React,{useState} from 'react'
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/NoteContext"

const Signup = () => {
    const context = useContext(noteContext);
    const {showAlert} = context;
    const navigate = useNavigate()

    const [Credential,setCredential]= useState({name:"",email:"",password:"",cpassword:""})
    const onchange= (e)=>{
        setCredential({...Credential,[e.target.name]:[e.target.value]})
    }

    const handleClick = async (e)=>{
        e.preventDefault()
        
        const response = await fetch("http://localhost:5000/api/auth/createuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name:Credential.name.toString(),email:Credential.email.toString(),password:Credential.password.toString()})
        })

        const json = await response.json();
        console.log(json.success)
        if(json.success === true){
            //Setting authtoken in localStorage
            localStorage.setItem("token",json.authToken);
            navigate("/")
            showAlert("Account Created Successfully","success")
        }
        else{
            alert("Invalid Credentials")
        }

    }


    return (
        <div className='container' style={{marginTop:"120px"}} >
            <h1>Signup to Continue to MyNotes:</h1>
            <form onSubmit={handleClick}>

            {/* <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control w-50" id="exampleInputEmail1" name="email" value={Credential.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} required />
                </div> */}


                <div className="form-group my-2" >
                    <label htmlFor="forName">Name</label>
                    <input type="text" className="form-control w-50" id="forName" value={Credential.name} aria-describedby="emailHelp" onChange={onchange} placeholder="Enter Name" name="name" required />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control w-50" id="exampleInputEmail1" value={Credential.email}  aria-describedby="emailHelp" onChange={onchange} placeholder="Enter email" name="email"required />
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputPassword1 ">Password</label>
                    <input type="password" className="form-control w-50" id="exampleInputPassword1" value={Credential.password}  onChange={onchange} placeholder="Password" name="password" required minLength={5}/>
                </div>
                <div className="form-group my-2">
                    <label htmlFor="exampleInputcPassword1 ">Confirm Password</label>
                    <input type="password" className="form-control w-50" id="exampleInputcPassword1" value={Credential.cpassword} onChange={onchange}  placeholder="Password" name="cpassword" required minLength={5} />
                </div>

                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
        </div>
    )
}

export default Signup
