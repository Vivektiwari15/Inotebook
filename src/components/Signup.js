import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {


    const navigate = useNavigate()
    const [signup,setsignup] = useState({name:"",email:"",password:"",Confirm_Password:""})

    const SignUp = async(e)=>{

        e.preventDefault()
        const {name,email,password,Confirm_Password} = signup
        const response = await fetch(`http://localhost:2000/auth`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            },
            body: JSON.stringify({name,email,password})
          })

          const json = await response.json()

          localStorage.setItem("authToken",json.authToken)
        
          if(password===Confirm_Password){
            if(json.success===true){
              navigate("/")
            }else{
              alert(json.error)
            }
          }
          else{
            alert("password and confirm password must be same")
          }


    }

    const signcred = (e)=>{

        setsignup({...signup,[e.target.name]:e.target.value})
    }

  return (
    <>
    <div className="container my-4 ml-5">
        <h1>Sign Up</h1>
    </div>
      <div className="container my-3 card">
      <form method='post' action='/login'>
  <div className="mb-3 py-3">
    <label htmlFor="exampleInputEmail1"  className="form-label">Name</label>
    <input type="name" name='name' onChange={signcred} autoComplete='suggested: "username"' value={signup.name} required className="form-control" id="name" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3 ">
    <label htmlFor="exampleInputEmail1"  className="form-label">Email address</label>
    <input type="email" name='email' onChange={signcred} value={signup.email} required className="form-control" id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' onChange={signcred} autoComplete='' value={signup.password} required className="form-control" id="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" name='Confirm_Password' onChange={signcred} autoComplete='suggested: "new-password"'  value={signup.Confirm_Password} required className="form-control" id="Confirm_Password"/>
  </div>
  <button type="submit" className="btn btn-primary btn-sm mb-3" onClick={SignUp}>Sign Up</button>
</form>
      </div>
    </>
  )
}
