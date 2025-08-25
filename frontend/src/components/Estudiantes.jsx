// src/components/Estudiantes.jsx
import React, { useState, useEffect } from "react";
import API from "../api";
import ListaEstudiantes from "./ListaEstudiantes";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [editingEstudiante, setEditingEstudiante] = useState(null);
  const [mdlOpen, setMdlOpen] = useState(false);

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    try {
      const res = await API.get("estudiantes/");
      setEstudiantes(res.data);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`estudiantes/${id}/`);
      fetchEstudiantes();
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
    }
  };

  const handleSave = () => {
    setEditingEstudiante(null);
    setMdlOpen(false);
    fetchEstudiantes();
  };

  const handleAddClick = () => {
    setEditingEstudiante(null);
    setMdlOpen(true);
  };

  const handleEditClick = (estudiante) => {
    setEditingEstudiante(estudiante);
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
            <th>Cursos</th>
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

      <ListaEstudiantes
        estudianteToEdit={editingEstudiante}
        onSave={handleSave}
        mdlOpen={mdlOpen}
        toggleModal={() => setMdlOpen(false)}
      />
    </div>
  );
};

export default Estudiantes;