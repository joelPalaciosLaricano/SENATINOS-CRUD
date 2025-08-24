import React, { useState, useEffect } from "react";
import API from "../api";
import "../styles/FormularioEstudiante.css";

const FormularioEstudiante = ({ estudiante, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    if (estudiante) {
      setNombre(estudiante.nombre);
      setApellido(estudiante.apellido);
    } else {
      setNombre("");
      setApellido("");
    }
    fetchEstudiantes();
  }, [estudiante]);

  const fetchEstudiantes = async () => {
    try {
      const response = await API.get("estudiantes/");
      setEstudiantes(response.data);
    } catch (error) {
      console.error("Error fetching estudiantes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, apellido };

    try {
      if (estudiante) {
        await API.put(`estudiantes/${estudiante.id}/`, data);
      } else {
        await API.post("estudiantes/", data);
      }
      setShowModal(false);
      setNombre("");
      setApellido("");
      onSave();
      fetchEstudiantes();
    } catch (error) {
      console.error("Hubo un error al guardar el estudiante:", error);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="form-container">
      <h3 className="form-title">
        Lista de Estudiantes
        <button type="button" className="form-button" onClick={openModal}>
          Añadir Estudiante
        </button>
      </h3>

      <table className="estudiantes-table">
        <thead className="estudiantes-table-header">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est) => (
            <tr key={est.id}>
              <td>{est.id}</td>
              <td>{est.nombre}</td>
              <td>{est.apellido}</td>
              <td>
                <button className="form-button">Editar</button>
                <button className="form-button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Agregar Nuevo Estudiante</h3>
              <button className="close-button" onClick={closeModal}>×</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-input"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <input
                type="text"
                className="form-input"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
              <div className="modal-buttons">
                <button type="button" className="form-button cancel-button" onClick={closeModal}>
                  Cancelar
                </button>
                <button type="submit" className="form-button">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormularioEstudiante;