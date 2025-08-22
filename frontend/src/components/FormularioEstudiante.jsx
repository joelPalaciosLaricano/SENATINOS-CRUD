import React, { useState, useEffect } from "react";
import API from "../api";

const FormularioEstudiante = ({ estudiante, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  useEffect(() => {
    if (estudiante) {
      setNombre(estudiante.nombre);
      setApellido(estudiante.apellido);
    } else {
      setNombre("");
      setApellido("");
    }
  }, [estudiante]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, apellido };

    try {
      if (estudiante) {
        await API.put(`estudiantes/${estudiante.id}/`, data);
      } else {
        await API.post("estudiantes/", data);
      }
      onSave(); // Refresca la lista de estudiantes
    } catch (error) {
      console.error("Hubo un error al guardar el estudiante:", error);
      // Aquí puedes añadir un manejo de errores más visible para el usuario
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-title">
        {estudiante ? "Editar Estudiante" : "Crear Estudiante"}
      </h3>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            className="form-input"
            placeholder="Ingresa el nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            id="apellido"
            type="text"
            className="form-input"
            placeholder="Ingresa el apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default FormularioEstudiante;
