import React, { useState, useEffect } from "react";
import API from "../api";
import FormularioEstudiante from "./FormularioEstudiante";

const Estudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [editingEstudiante, setEditingEstudiante] = useState(null);

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    const res = await API.get("estudiantes/");
    setEstudiantes(res.data);
  };

  const handleDelete = async (id) => {
    await API.delete(`estudiantes/${id}/`);
    fetchEstudiantes();
  };

  const handleSave = () => {
    setEditingEstudiante(null);
    fetchEstudiantes();
  };

  return (
    <div>
      <h2>Estudiantes</h2>
      <FormularioEstudiante
        estudiante={editingEstudiante}
        onSave={handleSave}
      />
      <ul>
        {estudiantes.map((estudiante) => (
          <li key={estudiante.id}>
            <strong>
              {estudiante.nombre} {estudiante.apellido}
            </strong>
            <button onClick={() => setEditingEstudiante(estudiante)}>
              Editar
            </button>
            <button onClick={() => handleDelete(estudiante.id)}>
              Eliminar
            </button>
            <p>Cursos:</p>
            <ul>
              {estudiante.cursos.map((curso) => (
                <li key={curso.id}>
                  {curso.nombre}: {curso.nota}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estudiantes;
