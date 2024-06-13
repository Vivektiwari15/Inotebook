import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/noteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import User from "./components/User"
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
            
      <NoteState>
        <Router>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/profile" element={<User/>}></Route>
          </Routes>
        </Router>
      </NoteState>
           
    </>
  );
}

export default App;
