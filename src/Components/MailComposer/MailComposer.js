import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import "./MailComposer.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MailComposer = () => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  
  // Get auth state from Redux
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const email = useSelector(state => state.auth.email);
  const userId = useSelector(state => state.auth.userId);
  
  const handleSend = async () => {
    if (!to || !subject || !body) {
      alert("All fields are required!");
      return;
    }
    
    if (!isLoggedIn || !email) {
      alert("You must be signed in to send emails");
      navigate("/login"); // Redirect to login page
      return;
    }
    
    try {
      console.log("Sending from:", email);
      
      // Save mail in `mails_sent`
      await addDoc(collection(db, "mails_sent"), {
        to,
        from: email,
        subject,
        body,
        timestamp: new Date(),
        userId: userId || "unknown"
      });
      
      // Save mail in `mails_received`
      await addDoc(collection(db, "mails_received"), {
        to,
        from: email,
        subject,
        body,
        timestamp: new Date(),
        userId: userId || "unknown"
      });
      
      alert("Mail sent successfully!");
      setTo("");
      setSubject("");
      setBody("");
    } catch (error) {
      console.error("Error sending mail:", error);
      alert(`Failed to send mail: ${error.message}`);
    }
  };
  
  if (!isLoggedIn) {
    return (
      <div className="mail-composer">
        <h3>You need to log in first</h3>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }
  
  return (
    <div className="mail-composer">
      
      {/*<div className="user-info">Logged in as: {email}</div>*/}
      <div>
        <label htmlFor="">To:</label>
        <input
          type="email"
          placeholder="Example@gmail.com"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <Editor
          theme="snow"
          value={body}
          onChange={setBody}
          placeholder="Write your email here..."
        />
      </div>
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MailComposer;