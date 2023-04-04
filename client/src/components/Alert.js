import React,{useContext} from 'react'
import noteContext from '../context/notes/NoteContext'

const Alert = (props) => {
    const context = useContext(noteContext) ;
    const {alert}=context
    return (
        <div style={{height:"9vh",position:"absolute",top:"8%",width:"100vw",zIndex:"1"}}>
            {alert && <div className={`alert alert-${alert.type}`} role="alert">
                {alert.msg}
            </div>}
        </div>
    )
}

export default Alert
