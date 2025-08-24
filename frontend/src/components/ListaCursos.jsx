import React, { useState, useEffect } from "react";
import API from "../api";
import "../styles/ListaCursos.css";

const ListaCurso = ({ curso, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [nota, setNota] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteId, setEstudianteId] = useState("");
  const [mdlOpen, setMdlOpen] = useState(false); // 👈 modal

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  useEffect(() => {
    if (curso) {
      setNombre(curso.nombre);
      setNota(curso.nota);
      setEstudianteId(curso.estudiante);
    } else {
      setNombre("");
      setNota("");
      if (estudiantes.length > 0) {
        setEstudianteId(estudiantes[0].id);
      }
    }
  }, [curso, estudiantes]);

  const fetchEstudiantes = async () => {
    const res = await API.get("estudiantes/");
    setEstudiantes(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { nombre, nota, estudiante: estudianteId };

    if (curso) {
      await API.put(`cursos/${curso.id}/`, data);
    } else {
      await API.post("cursos/", data);
    }
    onSave();
    toggleModal();
  };

  const toggleModal = () => setMdlOpen((v) => !v);

  return (
    <div className="form-container">
      <h3 className="form-title">
        Lista de Cursos
        <button type="button" className="form-button" onClick={toggleModal}>
          Añadir Curso
        </button>
      </h3>

      <table className="cursos-table">
        <thead className="cursos-table-header">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Nota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2</td>
            <td>Historia</td>
            <td>88</td>
            <td>
              <button className="form-button">Editar</button>
              <button className="form-button">Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>1</td>
            <td>Matemáticas</td>
            <td>95</td>
            <td>
              <button className="form-button">Editar</button>
              <button className="form-button">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* ===== Modal (igual al de estudiante, pero para cursos) ===== */}
      {mdlOpen && (
        <div className="mdl-overlay" onClick={toggleModal}>
          <div className="mdl-content" onClick={(e) => e.stopPropagation()}>
            <div className="mdl-header">
              <span className="mdl-title">Añadir Curso</span>
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
      {/* ===== fin modal ===== */}
    </div>
  );
};

export default ListaCurso;
