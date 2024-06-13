import React from 'react'
import { useContext , useEffect} from 'react'
import NoteContext from '../context/noteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'



export default function Note() {
    
 const navigate = useNavigate() 
 const context = useContext(NoteContext)
 const {state , getNotes}  = context

 // eslint-disable-next-line
 useEffect(()=>{
  if (localStorage.getItem('authToken')) {
    getNotes();
  }
  else{
    navigate("/login")
  }
   // eslint-disable-next-line
 },[])
 


  return (
<>
      <div className='container'>
      <AddNote/>
        <div className='row my-3'>
          <h3>Your Note:-</h3>
          <div className='container mx-2 my-3'>{state.length===0 && "No Note Availaible"}</div>
          {state.map((state)=>{
            return (<Noteitem key={state._id} title={state.title} description={state.description} id={state._id} />)
          })}
          </div>
      </div>
</>
  )
}
