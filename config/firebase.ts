import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXVdhrJ1hY2JblrRk-ePq3a3hRS6AMPXg",
  authDomain: "myauthenticationadv.firebaseapp.com",
  projectId: "myauthenticationadv",
  storageBucket: "myauthenticationadv.appspot.com",
  messagingSenderId: "376176561695",
  appId: "1:376176561695:web:fa19425c1152c31b3d4f2a",
  measurementId: "G-1T1BVK58M4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, storage };
