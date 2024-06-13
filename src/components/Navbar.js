import React from 'react'
import {Link,useLocation} from "react-router-dom";

export default function Navbar() {
 

  let location = useLocation()
  const logout = ()=>{
    localStorage.removeItem('authToken')
  }

  const profile = ()=>{
    
  }

 return (
<>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active":""}`} to="/about">About</Link>
        </li>
      </ul>
      {!localStorage.getItem('authToken')?<form className="d-flex" role="search">
      <Link className="btn btn-success btn-sm mx-1" to="/login" role="button">Login</Link>
      <Link className="btn btn-light btn-sm mx-1" to="/signup" role="button">Sign up</Link>
      </form>:<div><Link className="btn btn-danger btn-sm mx-2" to="/login" role="button" onClick={logout}>Log Out</Link><Link  to="/profile" ><i className="fa-solid fa-user fa-xl mx-2" id='profile' style={{color:"white"}} onClick={profile}></i></Link></div>}
    </div>
  </div>
</nav>
</>
  )
}
