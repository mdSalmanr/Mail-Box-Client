import React from 'react';
import './App.css';

import { Routes,Route } from 'react-router-dom';
import SignUpForm from './Components/SignUpForm';
import HomePage from './Components/HomePage/HomePage';



function App() {
  return (
    <Routes>
      <Route path='/' element={<SignUpForm/>}/>
      <Route path='/home' element={<HomePage/>}/>
    </Routes>
  );
}


export default App;
