import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Components/Firebase/Firebase";
import { authSlice } from "../../Store";
import { useSelector } from "react-redux";

const ReceivedMails = () => {
  const [receivedMails, setReceivedMails] = useState([]);
  const email = useSelector((state)=> state.auth.email)

  useEffect(() => {
    const fetchReceivedMails = async () => {
      const userEmail = email; // Replace with authenticated user's email
      const q = query(collection(db, "mails_received"), where("to", "==", userEmail));
      const querySnapshot = await getDocs(q);

      const mails = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReceivedMails(mails);
    };

    fetchReceivedMails();
  }, [email]);

  return (
    <div>
      <h3>Received Mails</h3>
      <ul>
        {receivedMails.map((mail) => (
          <li key={mail.id}>
            <strong>From:</strong> {mail.from} | <strong>Subject:</strong> {mail.subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReceivedMails;
