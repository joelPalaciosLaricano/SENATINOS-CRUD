import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Estudiantes from "./components/Estudiantes";
import Cursos from "./components/Cursos";
import "./styles/theme.css";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Aplicar el tema al body cuando cambie
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="Dashboard">
        <main>
          <div className="container">
            <Estudiantes />
          </div>
          <div className="container">
            <Cursos />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
