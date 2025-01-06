import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

//  configuracion  de conexion para firebase
const firebaseConfig = {
    apiKey: "Eliminada",
    authDomain: "Eliminada",
    projectId: "gestion-tarea-773b9",
    storageBucket: "Eliminada",
    messagingSenderId: "Eliminada",
    appId: "1:Eliminada"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const functions = getFunctions(app);
