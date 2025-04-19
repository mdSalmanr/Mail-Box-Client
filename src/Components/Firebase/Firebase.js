import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuFCVQntgkKez8Gd6N5xVCI6am0X6I6G4",
    authDomain: "project-e5b23.firebaseapp.com",
    databaseURL: "https://project-e5b23-default-rtdb.firebaseio.com",
    projectId: "project-e5b23",
    storageBucket: "project-e5b23.firebasestorage.app",
    messagingSenderId: "858316276365",
    appId: "1:858316276365:web:a128396195d6dea2aa98c4"
  };
  
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);