// src/components/ListaEstudiantes.jsx
import React, { useState, useEffect } from "react";
import API from "../api"; // Asegúrate de que api.js esté creado y configurado
import "../styles/ListaEstudiantes.css"; // Tus estilos CSS existentes

// Este componente ahora es exclusivamente para el formulario dentro del modal
const ListaEstudiantes = ({ estudianteToEdit, onSave, mdlOpen, toggleModal }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  // Cuando cambia el estudianteToEdit (para edición)
  useEffect(() => {
    if (estudianteToEdit) {
      // Si hay un estudiante para editar, carga sus datos
      setNombre(estudianteToEdit.nombre);
      setApellido(estudianteToEdit.apellido);
    } else {
      // Si no hay estudiante para editar (añadir nuevo), limpia el formulario
      setNombre("");
      setApellido("");
    }
  }, [estudianteToEdit]);

  // Maneja el envío del formulario (crear o actualizar estudiante)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, apellido };

    try {
      if (estudianteToEdit) {
        // Actualizar estudiante existente
        await API.put(`estudiantes/${estudianteToEdit.id}/`, data);
      } else {
        // Crear nuevo estudiante
        await API.post("estudiantes/", data);
      }
      onSave(); // Llama a la función onSave del padre para recargar la lista y cerrar el modal
    } catch (error) {
      console.error("Error al guardar estudiante:", error);
    }
  };

  return (
    <>
      {mdlOpen && ( // Solo renderiza el modal si mdlOpen es true
        <div className="mdl-overlay" onClick={toggleModal}>
          <div className="mdl-content" onClick={(e) => e.stopPropagation()}>
            <div className="mdl-header">
              <span className="mdl-title">{estudianteToEdit ? "Editar" : "Añadir"} Estudiante</span>
              <button className="mdl-close" onClick={toggleModal} aria-label="Cerrar">
                ×
              </button>
            </div>

            <form className="mdl-body" onSubmit={handleSubmit}>
              <label className="mdl-label">Nombre</label>
              <input
                className="mdl-input"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />

              <label className="mdl-label">Apellido</label>
              <input
                className="mdl-input"
                type="text"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />

              {/* La asignación de cursos se gestiona en el formulario de cursos,
                  no directamente al crear/editar un estudiante en este modelo. */}
              {/* <label className="mdl-label">Cursos Asignados</label>
              <div className="mdl-cursos">
                ... (Aquí iría la lógica si se implementara la asignación directa)
              </div> */}

              <div className="mdl-footer">
                <button type="button" className="mdl-btn mdl-btn-cancel" onClick={toggleModal}>
                  Cancelar
                </button>
                <button type="submit" className="mdl-btn mdl-btn-save">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ListaEstudiantes;