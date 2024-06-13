import React,{useContext, useState} from 'react'
import NoteContext from '../context/noteContext';



export default function Noteitem(props) {
  
  const {title,description,id} = props;
  const context = useContext(NoteContext)
  const {deleteNote,editNote} = context

  const [useModal,setModal] = useState({
    display:"none"
  })

  const [emodal,setemodal] = useState({
    display:"none"
  })

  const fnemodal = ()=>{
    setemodal({
      display:"block"
    })
  }

  const emodalclose = ()=>{
    setemodal({
      display:"none"
    })
  }

  const modal = (id)=>{

    setModal({
      display:"block"
    })

  }

 const modalClose = ()=>{
  setModal({
    display:"none"
  })
 }

 const [useText,setText] = useState(description)

const valueChange = (event)=>{
 setText(event.target.value)
}

const [useTitle,setTitle] = useState(title)

const titleChange = (event)=>{
  setTitle(event.target.value)
}
 
const update = ()=>{

   setModal({
    display:"none"
  })

  editNote(id,useTitle,useText)

}



  return (
    <>
    <div className='col-md-3 my-3'>
      <div className="card">
        <div className="card-body">
        <div className="d-flex justify-content-between"><h5 className="card-title">{title.length>6?title.slice(0,6)+"...":title}</h5> <i className="fa-solid fa-eye" onClick={fnemodal}></i></div>
        <p className="card-text">{description.length>15?description.slice(0,15)+"...":description}</p>
        <div className="d-flex justify-content-around"><i className="fa-solid fa-file-pen" onClick={()=>modal(id)}></i> <i className="fa-solid fa-trash" onClick={()=>{deleteNote(id)}}></i></div>
        </div>
      </div>
    </div>
    <div className='modals' style={useModal}>
        <div className='m-title'>
        <div className="container">
        <form method="post">
          <div className='my-3'><h3>Edit Note:</h3></div>
        <div className="mb-3 my-3">
        <input type="text" className="form-control" id="title" name='title' placeholder="Title"value={useTitle} onChange={titleChange} />
        </div>
        <hr />
        <div className="mb-3">
        <textarea  className="form-control" name='edescription' id="description" rows="8" placeholder="Enter your note" value={useText} onChange={valueChange}></textarea>
        </div>
        </form>
    </div>
        </div>
        <hr />
        <div className='m-body d-flex flex-row-reverse my-3'>
          <button className='btn btn-primary mx-2 p-2' onClick={update} > save changes</button>
          <button className='btn btn-secondary ' onClick={modalClose}>close</button>
        </div>
      </div>
      <div className='emodal mx-5' style={emodal}>
        <div className="emtitle my-3"><h3>{title}</h3><hr /></div>
        <div className="embody">{description}</div>
        <div className='m-body d-flex flex-row-reverse my-3'>
          <hr />
          <button className='btn btn-secondary' id='cls'  onClick={emodalclose}>close</button>
        </div>
      </div>

    </>
    )
}

