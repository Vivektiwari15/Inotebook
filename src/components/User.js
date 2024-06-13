import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/noteContext'

export default function User() {

    const context = useContext(NoteContext)
    const {user ,getUser }  = context


    useEffect((e)=>{
        getUser()
        //  eslint-disable-next-line
 },[])

 
  return (
    <>
    <div className='spc'>
    <div className="container my-5">
        <div className="pcard">
        <div className="pimg"><i class="fa-solid fa-user"></i></div>
        <div className="pname"><h2>Name: {user.name}</h2></div>
        <div className="pemail"><h2>Email: {user.email}</h2></div>
        </div>
    </div>
    </div>

    </>
  )
}
