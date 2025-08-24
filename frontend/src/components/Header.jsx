// src/components/Header.js
import React from "react";
import { IoSunnySharp } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="App-header">
      <h1>Gestión de Estudiantes y Cursos</h1>
      <button className={`theme ${theme}-toggle-button`} onClick={toggleTheme}>
        {theme === "light" ? <IoSunnySharp /> : <FaRegMoon />}
      </button>
    </header>
  );
};

export default Header;
