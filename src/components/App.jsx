import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Start from "../pages/Start"
import Keeper from "../pages/Keeper"
import Login from "../pages/Login";
import Header from "./Header";
import Footer from "./Footer";

function App() {


  return (

    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/notes" element={<Keeper/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </Router>

  );
}

export default App;