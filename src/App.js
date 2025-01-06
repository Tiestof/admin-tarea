import React, { useState } from "react";
import FormularioAgregarTarea from "./components/AddTaskForm";
import ListaTareas from "./components/TaskList";
import "./styles.css";

function App() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <div className="container">
      <h1>Gestión de Tareas</h1>
      <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        {mostrarFormulario ? "Ocultar Formulario" : "Agregar Tarea"}
      </button>
      {mostrarFormulario && <FormularioAgregarTarea />}
      <ListaTareas />
    </div>
  );
}

export default App;
