// src/components/Header.jsx
import React from "react";
import { IoSunnySharp } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="App-header">
      <h1>Gestión de Estudiantes y Cursos</h1>
      <button 
        className="theme" 
        onClick={toggleTheme}
        title={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
        aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
      >
        {theme === "light" ? <FaRegMoon /> : <IoSunnySharp />}
      </button>
    </header>
  );
};

export default Header;
