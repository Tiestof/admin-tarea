import React, { useState, useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioAgregarTarea = ({ onAgregarTarea }) => {
  // Estado para manejar los valores del formulario
  const [datosFormulario, setDatosFormulario] = useState({ nombre: "", fechaLimite: "" });
  const [validador] = useState(
    new SimpleReactValidator({
      validators: {
        // Definimos una regla personalizada para validar la fecha límite
        fechaValida: {
          message: "La fecha límite debe ser válida, no pasada y dentro de 5 años en el futuro.",
          rule: (val) => {
            const fechaIngresada = new Date(val);
            const fechaActual = new Date();
            const fechaLimiteMax = new Date();
            fechaLimiteMax.setFullYear(fechaActual.getFullYear() + 5); // Máximo 5 años en el futuro

            return (
              !isNaN(fechaIngresada.getTime()) &&
              fechaIngresada >= fechaActual &&
              fechaIngresada <= fechaLimiteMax
            );
          },
          required: true, // La regla se aplicará solo si el campo no está vacío
        },
      },
    })
  );
  const forceUpdate = useRef(0); // Forzamos un renderizado para mostrar los mensajes de validación de los campos

  const manejarCambio = (e) => {
    // Actualizamos el estado con los valores ingresados
    setDatosFormulario({ ...datosFormulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault(); // Evitamos recarga de página

    if (validador.allValid()) {
      try {
        const respuesta = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
        const datosAdicionales = respuesta.data;
        const fechaFormateada = new Date(datosFormulario.fechaLimite).toISOString().split("T")[0]; // Formateamos la fecha a formato "yyyy-mm-dd"

        // Agregamos la tarea validada a Firestore
        await addDoc(collection(db, "tareas"), {
          ...datosFormulario,
          fechaLimite: fechaFormateada,
          prioridad: datosAdicionales.title,
        });

        onAgregarTarea({ ...datosFormulario, fechaLimite: fechaFormateada, prioridad: datosAdicionales.title });
        setDatosFormulario({ nombre: "", fechaLimite: "" }); // Limpiamos el formulario
        validador.hideMessages(); // Ocultamos los mensajes de validación
      } catch (error) {
        console.error("Error al agregar tarea:", error);
      }
    } else {
      validador.showMessages(); // Mostramos mensajes de validación
      forceUpdate.current++; // Forzamos la renderización nuevamente
    }
  };
 // Formulario
  return (
    <form className="form-container" onSubmit={manejarEnvio}>
      <div className="form-group">
        <label>Nombre de la Tarea:</label>
        <input
          type="text"
          name="nombre"
          value={datosFormulario.nombre}
          onChange={manejarCambio}
          placeholder="Escribe el nombre de la tarea"
        />
        {/* Mostramos mensaje de validación si el campo está vacío */}
        {validador.message("nombre", datosFormulario.nombre, "required|min:3", { className: "text-danger" })}
      </div>
      <div className="form-group">
        <label>Fecha Límite:</label>
        <input type="date" name="fechaLimite" value={datosFormulario.fechaLimite} onChange={manejarCambio} />
        {/* Mostramos mensaje de validación si la fecha no cumple con los requisitos */}
        {validador.message("fecha límite", datosFormulario.fechaLimite, "required|fechaValida", {
          className: "text-danger",
        })}
      </div>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default FormularioAgregarTarea;
