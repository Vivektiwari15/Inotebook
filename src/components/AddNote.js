import React,{useContext,useState} from 'react'
import NoteContext from '../context/noteContext'

export default function AddNote() {

    const context = useContext(NoteContext)
    const {addNote} = context
    

    const [note,setnote] = useState({title:"",description:"",tag:""})
   
  
    const submit = (e)=>{
        e.preventDefault()
      addNote(note.title,note.description)
    }
  
  const change = (e)=>{
    setnote({...note,[e.target.name]:e.target.value})
  }
  

  return (
      <div className="container">
        <form method="post">
        <h1 className='my-3'>Write Your Note:-</h1>
        <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title' placeholder="Title" onChange={change}/>
        </div>
        <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">description:-</label>
        <textarea className="form-control" name='description' id="description" rows="8" placeholder="Enter your note" onChange={change}></textarea>
        </div>
        <button type="submit" disabled={note.title.length<5 || note.description.length<10} className="btn btn-primary btn-sm" onClick={submit}>Add Note</button>
        </form>
    </div>
  )
}
