import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../Components/Firebase/Firebase";
import { useSelector } from "react-redux";

const SentMails = () => {
  const [sentMails, setSentMails] = useState([]);
  const email = useSelector((state) => state.auth.email); // Get the email from Redux store

  useEffect(() => {
    const fetchSentMails = async () => {
      const senderEmail =  email ; // Replace with authenticated user's email
      const q = query(collection(db, "mails_sent"), where("from", "==", senderEmail));
      const querySnapshot = await getDocs(q);

      const mails = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSentMails(mails);
    };

    fetchSentMails();
  }, []);

  return (
    <div>
      <h3>Sent Mails</h3>
      <ul>
        {sentMails.map((mail) => (
          <li key={mail.id}>
            <strong>To:</strong> {mail.to} | <strong>Subject:</strong> {mail.subject}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SentMails;
