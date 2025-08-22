import React, { useState, useEffect } from "react";
import API from "../api";

const FormularioCurso = ({ curso, onSave }) => {
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
    <form onSubmit={handleSubmit}>
      <h3>{curso ? "Editar Curso" : "Crear Curso"}</h3>
      <input
        type="text"
        placeholder="Nombre del Curso"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        step="0.01"
        placeholder="Nota"
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        required
      />
      <select
        value={estudianteId}
        onChange={(e) => setEstudianteId(e.target.value)}
      >
        {estudiantes.map((est) => (
          <option key={est.id} value={est.id}>
            {est.nombre} {est.apellido}
          </option>
        ))}
      </select>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default FormularioCurso;
