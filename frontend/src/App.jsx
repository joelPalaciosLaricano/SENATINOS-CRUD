import React, { useState } from "react";
import Estudiantes from "./components/Estudiantes";
import Cursos from "./components/Cursos";
import "./styles/theme.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={`App ${theme}-theme`}>
      <header className="App-header">
        <h1>Gestión de Estudiantes y Cursos</h1>
        <button onClick={toggleTheme}>
          Cambiar a Tema {theme === "light" ? "Oscuro" : "Claro"}
        </button>
      </header>
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
