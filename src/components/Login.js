import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login(e) {

    const [useCred,setCred]  = useState({email:"",password:""})
    const navigate =useNavigate()

    const submit = async(e)=>{
      
        e.preventDefault()
        const response = await fetch(`http://localhost:2000/auth/login`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body: JSON.stringify({email:useCred.email,password:useCred.password})
          })

          const json = await response.json()
          const aa = localStorage.setItem("authToken",json.authToken)
          console.log(aa)
          if(json.success===true){
            navigate("/")
          }
          else{
            alert(json.error)
          }
          
    }


    const cred = (e)=>{

        setCred({...useCred,[e.target.name]:e.target.value})
    }

  return (
    <>
    <div className="container my-4 ml-5">
        <h1>Login</h1>
    </div>
      <div className="container my-3 card">
      <form method='post'>
  <div className="mb-3 py-3">
    <label htmlFor="exampleInputEmail1"  className="form-label">Email address</label>
    <input type="email" name='email' value={useCred.email} onChange={cred} required className="form-control" id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" autoComplete='suggested: "current-password"' value={useCred.password} onChange={cred} name='password' required className="form-control" id="password"/>
  </div>
  <button type="submit" className="btn btn-success  btn-sm mb-3" onClick={submit}>Submit</button>
</form>
      </div>
    </>
  )
}
