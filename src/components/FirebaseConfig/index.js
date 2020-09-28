import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCjfmxLhQ1MamquPmk3C_3DGQzLCud5dEY",
  authDomain: "animal-colony-project.firebaseapp.com",
  databaseURL: "https://animal-colony-project.firebaseio.com",
  projectId: "animal-colony-project",
  storageBucket: "animal-colony-project.appspot.com",
  messagingSenderId: "216559495555",
  appId: "1:216559495555:web:05385f41426574007eaeb6",
  measurementId: "G-NRTWN3R9CG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
