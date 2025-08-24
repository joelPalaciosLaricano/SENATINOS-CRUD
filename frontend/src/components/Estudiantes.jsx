// src/components/Estudiantes.jsx
import React, { useState, useEffect } from "react";
import API from "../api"; // Asegúrate de que api.js esté creado y configurado
import ListaEstudiantes from "./ListaEstudiantes"; // Importa el componente para añadir/editar estudiantes

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [editingEstudiante, setEditingEstudiante] = useState(null); // Almacena el estudiante a editar
  const [mdlOpen, setMdlOpen] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  // Función para obtener todos los estudiantes del backend
  const fetchEstudiantes = async () => {
    try {
      const res = await API.get("estudiantes/");
      setEstudiantes(res.data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  // Función para eliminar un estudiante
  const handleDelete = async (id) => {
    try {
      await API.delete(`estudiantes/${id}/`);
      fetchEstudiantes(); // Recarga la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  // Función que se llama cuando se guarda un estudiante (nuevo o editado)
  const handleSave = () => {
    setEditingEstudiante(null); // Limpia el estudiante en edición
    setMdlOpen(false); // Cierra el modal
    fetchEstudiantes(); // Recarga la lista
  };

  // Abre el modal para añadir un nuevo estudiante
  const handleAddClick = () => {
    setEditingEstudiante(null); // Asegura que no haya un estudiante en edición
    setMdlOpen(true);
  };

  // Abre el modal para editar un estudiante existente
  const handleEditClick = (estudiante) => {
    setEditingEstudiante(estudiante); // Establece el estudiante a editar
    setMdlOpen(true);
  };

  return (
    <div className="form-container">
      <h3 className="form-title">
        Lista de Estudiantes
        <button type="button" className="form-button" onClick={handleAddClick}>
          Añadir Estudiante
        </button>
      </h3>

      <table className="estudiantes-table">
        <thead className="estudiantes-table-header">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cursos</th> {/* Columna para mostrar cursos */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.length > 0 ? (
            estudiantes.map((estudiante) => (
              <tr key={estudiante.id}>
                <td>{estudiante.id}</td>
                <td>{estudiante.nombre}</td>
                <td>{estudiante.apellido}</td>
                <td>
                  {estudiante.cursos && estudiante.cursos.length > 0 ? (
                    <ul>
                      {estudiante.cursos.map((curso) => (
                        <li key={curso.id}>{curso.nombre} ({curso.nota})</li>
                      ))}
                    </ul>
                  ) : (
                    "Sin cursos"
                  )}
                </td>
                <td>
                  <button className="form-button" onClick={() => handleEditClick(estudiante)}>
                    Editar
                  </button>
                  <button className="form-button" onClick={() => handleDelete(estudiante.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No hay estudiantes registrados.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* El modal de ListaEstudiantes se renderiza aquí y controla su propia visibilidad */}
      <ListaEstudiantes
        estudianteToEdit={editingEstudiante}
        onSave={handleSave}
        mdlOpen={mdlOpen} // Pasa el estado de apertura del modal
        toggleModal={() => setMdlOpen(false)} // Función para cerrar el modal desde dentro
      />
    </div>
  );
};

export default Estudiantes;