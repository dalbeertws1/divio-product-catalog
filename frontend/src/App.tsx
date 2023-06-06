import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './mycomponents/Home';
import LoginSignup from './mycomponents/LoginSignup';
import DataTable from './mycomponents/HomePage';
function App() {
  const token = localStorage.getItem("token") + ""
  console.log("token", token);
  return (
    <Router>
      <Routes>
      <Route path="/test" element={<LoginSignup />} />
        {(token + "") !== "null" && (
          <Route path="/home" element={<DataTable />} />
        )}
        {(token + "") === "null" && (
          <Route path="/" element={<LoginSignup />} />
        )}
       
      </Routes>


    </Router>
  );
}

export default App;
