// src/components/ListaCursos.jsx
import React, { useState, useEffect } from "react";
import API from "../api"; // Asegúrate de que api.js esté creado y configurado
import "../styles/ListaCursos.css"; // Tus estilos CSS existentes

// Este componente ahora es exclusivamente para el formulario dentro del modal
const ListaCurso = ({ cursoToEdit, onSave, mdlOpen, toggleModal }) => {
  const [nombre, setNombre] = useState("");
  const [nota, setNota] = useState("");

  // Cuando cambia el cursoToEdit (para edición)
  useEffect(() => {
    if (cursoToEdit) {
      // Si hay un curso para editar, carga sus datos
      setNombre(cursoToEdit.nombre);
      setNota(cursoToEdit.nota);
    } else {
      // Si no hay curso para editar (añadir nuevo), limpia el formulario
      setNombre("");
      setNota("");
    }
  }, [cursoToEdit]);

  // Maneja el envío del formulario (crear o actualizar curso)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación de campos
    if (!nombre.trim()) {
      alert("El nombre del curso es obligatorio");
      return;
    }
    
    if (!nota || nota === "") {
      alert("La nota es obligatoria");
      return;
    }
    
    const data = { nombre: nombre.trim(), nota };

    try {
      if (cursoToEdit) {
        // Actualizar curso existente
        await API.put(`cursos/${cursoToEdit.id}/`, data);
      } else {
        // Crear nuevo curso
        await API.post("cursos/", data);
      }
      onSave(); // Llama a la función onSave del padre para recargar la lista y cerrar el modal
    } catch (error) {
      console.error("Error al guardar curso:", error);
      alert("Error al guardar el curso. Verifique los datos e intente nuevamente.");
    }
  };

  return (
    <>
      {mdlOpen && ( // Solo renderiza el modal si mdlOpen es true
        <div className="mdl-overlay" onClick={toggleModal}>
          <div className="mdl-content" onClick={(e) => e.stopPropagation()}>
            <div className="mdl-header">
              <span className="mdl-title">{cursoToEdit ? "Editar" : "Añadir"} Curso</span>
              <button className="mdl-close" onClick={toggleModal} aria-label="Cerrar">
                ×
              </button>
            </div>

            <form className="mdl-body" onSubmit={handleSubmit}>
              <label className="mdl-label">Nombre del Curso</label>
              <input
                className="mdl-input"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />

              <label className="mdl-label">Nota</label>
              <input
                className="mdl-input"
                type="number"
                step="0.01" // Permite números decimales
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                required
              />

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

export default ListaCurso;