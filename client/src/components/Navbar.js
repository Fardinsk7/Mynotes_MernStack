import React, { useEffect,useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import noteContext from '../context/notes/NoteContext';
import { useContext } from 'react';


const Navbar = () => {
    const context= useContext(noteContext)
    const {getUserinfo,userinfo} = context;
    //React Bootstrap Code to get Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const location = useLocation()
  const navigate = useNavigate()
  const handleLogout = () => {
    console.log("Logout")
    localStorage.removeItem("token")
    navigate("/login")
  }
  useEffect(() => {
  }, [location])
  
  useEffect(()=>{
    getUserinfo()

  })

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyNotes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>

          </ul>
          {!localStorage.getItem("token") ? <div>
            <Link className="btn btn-primary mx-1" to="/login">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup">Signup</Link></div> : <div>
            <Button variant="primary" onClick={handleShow}  >
            <i class="fa-regular fa-circle-user"></i>
            </Button>

              <Modal show={show} onHide={handleClose}>
                <Modal.Header  closeButton>
                  <Modal.Title className="" style={{position:"absolute",right:"35%"}} >User Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5>Name: {userinfo.name}</h5>
                  <h5>Email: {userinfo.email}</h5>

                </Modal.Body>
                
              </Modal>






            <button className="btn btn-primary mx-2" onClick={handleLogout} >Logout</button></div>

          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar
