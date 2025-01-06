import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

//  configuracion  de conexion para firebase
const firebaseConfig = {
    apiKey: "AIzaSyBxrCEQ0iDaxBmdbw12gv6b_1fs3FKCV80",
    authDomain: "gestion-tarea-773b9.firebaseapp.com",
    projectId: "gestion-tarea-773b9",
    storageBucket: "gestion-tarea-773b9.firebasestorage.app",
    messagingSenderId: "471240972536",
    appId: "1:471240972536:web:7df3a0351762bef69f430d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);
