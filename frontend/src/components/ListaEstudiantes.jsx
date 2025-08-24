import React, { useState, useEffect } from "react";
import API from "../api";
import "../styles/ListaEstudiantes.css";

const ListaEstudiantes = ({ estudiantes, onEdit, onDelete }) => {
  // --- solo para el modal ---
  const [mdlOpen, setMdlOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cursos, setCursos] = useState({
    matematicas: false,
    historia: false,
    programacion: false,
  });

  const toggleModal = () => setMdlOpen((v) => !v);
  const handleCheck = (e) => {
    const { name, checked } = e.target;
    setCursos((p) => ({ ...p, [name]: checked }));
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // por ahora solo visual
  };
  // --- fin modal ---

  return (
    <div className="form-container">
      <h3 className="form-title">
        Lista de Estudiantes
        <button
          type="submit"
          className="form-button"
          onClick={toggleModal}
        >
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
          <tr>
            <td>2</td>
            <td>María</td>
            <td>López</td>
            <td>
              <button className="form-button">Editar</button>
              <button className="form-button">Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Juan</td>
            <td>Pérez</td>
            <td>
              <button className="form-button">Editar</button>
              <button className="form-button">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== Modal (solo añadido) ===== */}
      {mdlOpen && (
        <div className="mdl-overlay" onClick={toggleModal}>
          <div className="mdl-content" onClick={(e) => e.stopPropagation()}>
            <div className="mdl-header">
              <span className="mdl-title">Añadir Estudiante</span>
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
                <label className="mdl-checkbox">
                  <input
                    type="checkbox"
                    name="matematicas"
                    checked={cursos.matematicas}
                    onChange={handleCheck}
                  />
                  <span>Matemáticas</span>
                </label>
                <label className="mdl-checkbox">
                  <input
                    type="checkbox"
                    name="historia"
                    checked={cursos.historia}
                    onChange={handleCheck}
                  />
                  <span>Historia</span>
                </label>
                <label className="mdl-checkbox">
                  <input
                    type="checkbox"
                    name="programacion"
                    checked={cursos.programacion}
                    onChange={handleCheck}
                  />
                  <span>Programación</span>
                </label>
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
      {/* ===== fin modal ===== */}
    </div>
  );
};

export default ListaEstudiantes;
