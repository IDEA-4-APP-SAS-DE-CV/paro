// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const id = crypto.randomUUID();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACE0-INgpOXVwz60xM2rAeE3J7190Br-c",
  authDomain: "paro-cf440.firebaseapp.com",
  projectId: "paro-cf440",
  storageBucket: "paro-cf440.appspot.com",
  messagingSenderId: "615638289152",
  appId: "1:615638289152:web:4a96350961dae199e7c1e5",
  measurementId: "G-JXCF87EL41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file, path){
  const storageRef = ref(storage, `/${path}/${id}-${file.name}`);
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return url;
}
