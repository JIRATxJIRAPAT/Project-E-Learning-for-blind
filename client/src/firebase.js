// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBTw6_gVKXlCZb1zSLsj3RavRbGEycei8M",
  authDomain: "e-learning-for-the-blind-d7398.firebaseapp.com",
  projectId: "e-learning-for-the-blind-d7398",
  storageBucket: "e-learning-for-the-blind-d7398.appspot.com",
  messagingSenderId: "84340817416",
  appId: "1:84340817416:web:ab4a4d7cb86ce8704c9bbd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)