import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBAsFkz1WQjIJNgI0ssJF4TiIJOHDjnBX8",
    authDomain: "firbase-notifications-a0745.firebaseapp.com",
    projectId: "firbase-notifications-a0745",
    storageBucket: "firbase-notifications-a0745.appspot.com",
    messagingSenderId: "684894178558",
    appId: "1:684894178558:web:8945a19bf42a3888bfa9af",
    measurementId: "G-4MFCDGX5T2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
export const auth = getAuth(app);