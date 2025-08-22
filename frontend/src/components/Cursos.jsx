import React, { useState, useEffect } from "react";
import API from "../api";
import FormularioCurso from "./FormularioCurso";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [editingCurso, setEditingCurso] = useState(null);

  useEffect(() => {
    fetchCursos();
  }, []);

  const fetchCursos = async () => {
    const res = await API.get("cursos/");
    setCursos(res.data);
  };

  const handleDelete = async (id) => {
    await API.delete(`cursos/${id}/`);
    fetchCursos();
  };

  const handleSave = () => {
    setEditingCurso(null);
    fetchCursos();
  };

  return (
    <div>
      <h2>Cursos</h2>
      <FormularioCurso curso={editingCurso} onSave={handleSave} />
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id}>
            <strong>{curso.nombre}</strong> - Nota: {curso.nota}
            <button onClick={() => setEditingCurso(curso)}>Editar</button>
            <button onClick={() => handleDelete(curso.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cursos;
