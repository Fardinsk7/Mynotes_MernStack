import React,{useState,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import noteContext from '../context/notes/NoteContext'

const Login = () => {
    const context = useContext(noteContext);
    const {alert,showAlert}=context;
    const navigate = useNavigate()
    const [Credential,setCredential] = useState({email:"",password:""})
    const onchange= (e)=>{
        setCredential({...Credential,[e.target.name]:[e.target.value]})
    }

    const handleClick = async (e)=>{
        e.preventDefault()
        
        const response = await fetch("http://localhost:5000/api/auth/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({email:Credential.email,password:Credential.password.toString()})
        })

        const json = await response.json();
        
        if(json.success === true){
            //Setting authtoken in localStorage
            localStorage.setItem("token",json.authToken);
            navigate("/");
            showAlert("Login Successfull","success")
        }
        else{
            alert("Invalid Credentials")
        }

    }

    return (
        <div className="container" style={{marginTop:"120px"}}>
            <h1>Login to Continue to MyNotes: </h1>

            <form onSubmit={handleClick}>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control w-50" id="exampleInputEmail1" name="email" value={Credential.email} aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control w-50" id="exampleInputPassword1" name="password" onChange={onchange} value={Credential.password} placeholder="Password" required />
                </div>
                
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
        </div>
    )
}

export default Login
