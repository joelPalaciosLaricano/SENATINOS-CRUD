import React, { useState, useEffect } from "react";
import API from "../api";
import "../styles/ListaEstudiantes.css";

const ListaEstudiantes = ({ estudiantes, onEdit, onDelete }) => {
  return (
    <div className="form-container">
      <h3 className="form-title">
        Lista de Estudiantes
      <button  type="submit" className="form-button">
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
  </div>
);
};

export default ListaEstudiantes;
