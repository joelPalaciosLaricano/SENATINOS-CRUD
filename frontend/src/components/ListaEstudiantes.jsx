// src/components/ListaEstudiantes.jsx
import React, { useState, useEffect } from "react";
import API from "../api";
import "../styles/ListaEstudiantes.css";

const ListaEstudiantes = ({ estudianteToEdit, onSave, mdlOpen, toggleModal }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cursosDisponibles, setCursosDisponibles] = useState([]);
  const [cursosSeleccionados, setCursosSeleccionados] = useState([]);

  // Cargar cursos disponibles al abrir el modal
  useEffect(() => {
    if (mdlOpen) {
      fetchCursosDisponibles();
    }
  }, [mdlOpen]);

  // Cuando cambia el estudianteToEdit (para edición)
  useEffect(() => {
    if (estudianteToEdit) {
      // Si hay un estudiante para editar, carga sus datos
      setNombre(estudianteToEdit.nombre);
      setApellido(estudianteToEdit.apellido);
      // Cargar cursos ya asignados
      if (estudianteToEdit.cursos) {
        setCursosSeleccionados(estudianteToEdit.cursos.map(curso => curso.id));
      } else {
        setCursosSeleccionados([]);
      }
    } else {
      // Si no hay estudiante para editar (añadir nuevo), limpia el formulario
      setNombre("");
      setApellido("");
      setCursosSeleccionados([]);
    }
  }, [estudianteToEdit]);

  // Obtener la lista de cursos disponibles
  const fetchCursosDisponibles = async () => {
    try {
      const res = await API.get("cursos/");
      setCursosDisponibles(res.data);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  };

  // Maneja la selección/deselección de cursos
  const handleCursoChange = (cursoId) => {
    setCursosSeleccionados(prev => {
      if (prev.includes(cursoId)) {
        return prev.filter(id => id !== cursoId);
      } else {
        return [...prev, cursoId];
      }
    });
  };

  // Maneja el envío del formulario (crear o actualizar estudiante)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación de campos
    if (!nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }
    
    if (!apellido.trim()) {
      alert("El apellido es obligatorio");
      return;
    }
    
    const data = { 
      nombre: nombre.trim(), 
      apellido: apellido.trim(),
      cursos: cursosSeleccionados
    };

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
      alert("Error al guardar el estudiante. Verifique los datos e intente nuevamente.");
    }
  };

  return (
    <>
      {mdlOpen && (
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

              <label className="mdl-label">Cursos Asignados</label>
              <div className="mdl-cursos">
                {cursosDisponibles.length > 0 ? (
                  cursosDisponibles.map((curso) => (
                    <label key={curso.id} className="mdl-checkbox">
                      <input
                        type="checkbox"
                        checked={cursosSeleccionados.includes(curso.id)}
                        onChange={() => handleCursoChange(curso.id)}
                      />
                      {curso.nombre} ({curso.nota})
                    </label>
                  ))
                ) : (
                  <p>No hay cursos disponibles</p>
                )}
              </div>

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