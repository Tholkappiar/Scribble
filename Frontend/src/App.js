import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../src/New/Home';
import Login from '../src/New/login';
import Signup from '../src/New/Signup';
import AddOrUpdate from './New/AddOrUpdate';
import Dashboard from './New/Dashboard';


function App() {
  return (
    
    <>
    <BrowserRouter>
    <Routes>
         <Route exact path="/"  element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/add" element ={<AddOrUpdate />}></Route>
         <Route path="/update/:id" element ={<AddOrUpdate />}></Route>
       </Routes>
     </BrowserRouter>
    </>
   
  );
}

export default App;
