// src/components/Cursos.jsx
import React, { useState, useEffect } from "react";
import API from "../api"; // Asegúrate de que api.js esté creado y configurado
import ListaCurso from "./ListaCursos"; // Importa el componente para añadir/editar cursos

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editingCurso, setEditingCurso] = useState(null); // Almacena el curso a editar
  const [mdlOpen, setMdlOpen] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    fetchCursos();
  }, []);

  // Función para obtener todos los cursos del backend
  const fetchCursos = async () => {
    try {
      const res = await API.get("cursos/");
      setCursos(res.data);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  };

  // Función para eliminar un curso
  const handleDelete = async (id) => {
    try {
      await API.delete(`cursos/${id}/`);
      fetchCursos(); // Recarga la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar curso:", error);
    }
  };

  // Función que se llama cuando se guarda un curso (nuevo o editado)
  const handleSave = () => {
    setEditingCurso(null); // Limpia el curso en edición
    setMdlOpen(false); // Cierra el modal
    fetchCursos(); // Recarga la lista
  };

  // Abre el modal para añadir un nuevo curso
  const handleAddClick = () => {
    setEditingCurso(null); // Asegura que no haya un curso en edición
    setMdlOpen(true);
  };

  // Abre el modal para editar un curso existente
  const handleEditClick = (curso) => {
    setEditingCurso(curso); // Establece el curso a editar
    setMdlOpen(true);
  };

  return (
    <div className="form-container">
      <h3 className="form-title">
        Lista de Cursos
        <button type="button" className="form-button" onClick={handleAddClick}>
          Añadir Curso
        </button>
      </h3>

      <table className="cursos-table">
        <thead className="cursos-table-header">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Nota</th>
            {/* Se elimina la columna 'Estudiante ID' según la solicitud */}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.length > 0 ? (
            cursos.map((curso) => (
              <tr key={curso.id}>
                <td>{curso.id}</td>
                <td>{curso.nombre}</td>
                <td>{curso.nota}</td>
                <td>
                  <button
                    className="form-button"
                    onClick={() => handleEditClick(curso)}
                  >
                    Editar
                  </button>
                  <button
                    className="form-button"
                    onClick={() => handleDelete(curso.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay cursos registrados.</td>{" "}
              {/* Se ajusta el colSpan a 4 */}
            </tr>
          )}
        </tbody>
      </table>

      {/* El modal de ListaCurso se renderiza aquí y controla su propia visibilidad */}
      <ListaCurso
        cursoToEdit={editingCurso}
        onSave={handleSave}
        mdlOpen={mdlOpen} // Pasa el estado de apertura del modal
        toggleModal={() => setMdlOpen(false)} // Función para cerrar el modal desde dentro
      />
    </div>
  );
};

export default Cursos;
