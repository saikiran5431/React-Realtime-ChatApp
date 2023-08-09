import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDp12TaKAwOhZt0dB9UTBo3fs93pDyzoF0",
  authDomain: "relativechat-5f285.firebaseapp.com",
  projectId: "relativechat-5f285",
  storageBucket: "relativechat-5f285.appspot.com",
  messagingSenderId: "408718822422",
  appId: "1:408718822422:web:47aeca987eecf97d43b937"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
