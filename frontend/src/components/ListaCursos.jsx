import React, { useState, useEffect } from "react";
import API from "../api";
import "../styles/ListaCursos.css";

const ListaCurso = ({ curso, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [nota, setNota] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteId, setEstudianteId] = useState("");

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
  };

  return (
    <div className="form-container">
      <h3 className="form-title">
        Lista de Cursos
        <button type="submit" className="form-button">
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
    </div>
  );
};

export default ListaCurso;
