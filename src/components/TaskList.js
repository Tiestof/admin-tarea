import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";

const ListaTareas = () => {
  const [tareas, setTareas] = useState([]);
  const funciones = getFunctions(); // Inicializamos funciones de Firebase
  const eliminarTarea = httpsCallable(funciones, "deleteTask"); // Función de eliminación de tareas

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tareas"), (snapshot) => {
      const datosTareas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTareas(datosTareas); // Actualizamos estado con las tareas
    });

    return () => unsubscribe(); // Limpiamos la suscripción al desmontar
  }, []);

  const manejarEliminar = async (id) => {
    try {
      const resultado = await eliminarTarea({ taskId: id }); // Llamamos a la función de eliminación
      console.log("Respuesta de la función:", resultado.data.message);
    } catch (error) {
      console.error("Error al eliminar tarea:", error.message);
    }
  };

  return (
    <div>
      {tareas.length === 0 ? (
        <p>No hay tareas pendientes</p> // Si no hay tareas creadas, muestra esta linea.
      ) : (
        <ul className="project-list">
          {tareas.map((tarea) => (
            <React.Fragment key={tarea.id}>
              <li className="project-item">
                <h3>{tarea.nombre}</h3>
                <p>Fecha Límite: {tarea.fechaLimite}</p>
                <p>Prioridad: {tarea.prioridad}</p>
                <button onClick={() => manejarEliminar(tarea.id)}>Eliminar</button>
              </li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaTareas;
