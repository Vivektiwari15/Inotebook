import NoteContext from "./noteContext";
import { useState } from "react";

const host = "http://localhost:2000"

export default function NoteState(props) {
  
  const intialnotes = []
  const [state,setStae] = useState(intialnotes)

  const getNotes =async ()=>{

      const response = await fetch(`${host}/notes/getnotes`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "authToken":localStorage.getItem('authToken')
        },
      })
    
      const json = await response.json()
      
      // console.log(Notes)
      setStae(json)
      
    }
    
    
    const addNote = async (title,description)=>{

      // eslint-disable-next-line
      const response = await fetch(`${host}/notes/addnotes`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "authToken":localStorage.getItem('authToken')
        },
        body: JSON.stringify({title,description})
      })
      
      const notez = await response.json({title,description})
      
      setStae(state.concat(notez))
    }
    
    const deleteNote = async (id)=>{
      
      const newNotwe = state.filter((state)=>{return state._id!==id})
      // eslint-disable-next-line
      const response = await fetch(`${host}/notes/deletenotes/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          "authToken":localStorage.getItem("authToken")
        },
      })
      
      setStae(newNotwe)
      
    }
    
    const editNote = async (id,title,description)=>{
      
      const response = await fetch(`${host}/notes/updatenotes/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          "authToken":localStorage.getItem('authToken')
        },
        body: JSON.stringify({title,description})
      })
      
      const json =await response.json()
      console.log(json)
      
      let NewNotes = JSON.parse(JSON.stringify(state))
      
      for (let index = 0; index < NewNotes.length; index++) {
        
        const element  = state[index]
        
        if(element._id===id){
          NewNotes[index].title = title
          NewNotes[index].descriptionription = description
          break
        }
        
      }
      setStae(NewNotes)
    }

    const [user,setuser] = useState("")

    const getUser = async()=>{

      const response = await fetch(`http://localhost:2000/auth/getuser`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "authToken":localStorage.getItem('authToken')
        },
      })

      const json = await response.json()
      setuser(json)
    }
    
          return (
          
            <NoteContext.Provider value={{state,addNote,deleteNote,getNotes,editNote,getUser,user}}>
            {props.children}
        </NoteContext.Provider>)

}