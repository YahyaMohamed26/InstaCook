import * as firebase from 'firebase/app';
import { getStorage } from 'firebase/storage';
import 'firebase/firestore';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ===================== INITIALIZE FIREBASE ====================
const firebaseConfig = {
  apiKey: 'AIzaSyCiPcr-HOlymAXiTliCGqrOQEPL6I5FG7s',
  authDomain: 'senior-project-99e52.firebaseapp.com',
  projectId: 'senior-project-99e52',
  storageBucket: 'senior-project-99e52.appspot.com',
  messagingSenderId: '1056653965534',
  appId: '1:1056653965534:web:f3d32936dd358ac9d76a4f',
  measurementId: 'G-KELGZRN776',
};

const app = firebase.initializeApp(firebaseConfig);
const auth = initializeAuth(app);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { app, firestore, storage, auth };
