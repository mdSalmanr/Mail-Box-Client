import React from 'react';
import './App.css';

import { Routes,Route } from 'react-router-dom';
import SignUpForm from './Components/SignUpForm';
import HomePage from './Components/HomePage/HomePage';
import SentMails from './Pages/SentMail/SentMail';
import MailComposer from './Components/MailComposer/MailComposer';
import ReceivedMails from './Pages/RecievedMail/RecievedMail';



function App() {
  return (
    <Routes>
      <Route path='/' element={<SignUpForm/>}/>
      {/*<Route path='/home' element={<HomePage/>}/>*/}
      <Route path="/mail" element={<MailComposer />} />
      <Route path="/home" element={<SentMails />} />
      <Route path="/received" element={<ReceivedMails />} />
    </Routes>
  );
}


export default App;
