// src/components/ListaCursos.jsx
import React, { useState, useEffect } from "react";
import API from "../api"; // Asegúrate de que api.js esté creado y configurado
import "../styles/ListaCursos.css"; // Tus estilos CSS existentes

// Este componente ahora es exclusivamente para el formulario dentro del modal
const ListaCurso = ({ cursoToEdit, onSave, mdlOpen, toggleModal }) => {
  const [nombre, setNombre] = useState("");
  const [nota, setNota] = useState("");
  const [estudiantes, setEstudiantes] = useState([]); // Para el selector de estudiante
  const [estudianteId, setEstudianteId] = useState("");

  useEffect(() => {
    fetchEstudiantes(); // Carga los estudiantes al inicio para el selector
  }, []);

  // Cuando cambia el cursoToEdit (para edición) o la lista de estudiantes
  useEffect(() => {
    if (cursoToEdit) {
      // Si hay un curso para editar, carga sus datos
      setNombre(cursoToEdit.nombre);
      setNota(cursoToEdit.nota);
      setEstudianteId(cursoToEdit.estudiante);
    } else {
      // Si no hay curso para editar (añadir nuevo), limpia el formulario
      setNombre("");
      setNota("");
      // Si hay estudiantes, selecciona el primero por defecto
      if (estudiantes.length > 0) {
        setEstudianteId(estudiantes[0].id);
      } else {
        setEstudianteId(""); // O deja vacío si no hay estudiantes
      }
    }
  }, [cursoToEdit, estudiantes]);

  // Obtener la lista de estudiantes para el selector
  const fetchEstudiantes = async () => {
    try {
      const res = await API.get("estudiantes/");
      setEstudiantes(res.data);
      // Si no hay un estudiante seleccionado y hay estudiantes, selecciona el primero
      if (!estudianteId && res.data.length > 0) {
        setEstudianteId(res.data[0].id);
      }
    } catch (error) {
      console.error("Error al obtener estudiantes para el selector:", error);
    }
  };

  // Maneja el envío del formulario (crear o actualizar curso)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, nota, estudiante: estudianteId };

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

              <label className="mdl-label">Estudiante</label>
              <select
                className="mdl-input"
                value={estudianteId}
                onChange={(e) => setEstudianteId(e.target.value)}
                required
              >
                {estudiantes.length > 0 ? (
                  estudiantes.map((est) => (
                    <option key={est.id} value={est.id}>
                      {est.nombre} {est.apellido}
                    </option>
                  ))
                ) : (
                  <option value="">Cargando estudiantes...</option>
                )}
              </select>

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