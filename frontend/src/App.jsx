import React, { useState } from "react";
import Estudiantes from "./components/Estudiantes";
import Cursos from "./components/Cursos";
import "./styles/theme.css";
import { IoSunnySharp } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="Dashboard">
      <div className="Titulo">
      <h1>Gestión Académica</h1>
      </div>
      <main>
        <div className="container">
          <Estudiantes />
        </div>
        <div className="container">
          <Cursos />
        </div>
      </main>
    </div>
  );
}

export default App;
