import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCwN3DQzbnabkB35LXyXDZuzuYFSggUHO0",
  authDomain: "miniblog-c485f.firebaseapp.com",
  projectId: "miniblog-c485f",
  storageBucket: "miniblog-c485f.appspot.com",
  messagingSenderId: "905383849237",
  appId: "1:905383849237:web:0596ac592c32c283d3cd1c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };