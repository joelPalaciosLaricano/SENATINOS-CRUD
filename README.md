# SENATINOS-CRUD 🎓

Sistema de gestión CRUD (Create, Read, Update, Delete) desarrollado para la administración de datos académicos de SENATINOS. Este proyecto proporciona una interfaz completa para el manejo de información estudiantil y académica.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Base de Datos](#base-de-datos)
- [Contribución](#contribución)
- [Licencia](#licencia)

## ✨ Características

- **Gestión Completa CRUD**: Crear, leer, actualizar y eliminar registros
- **Interfaz Intuitiva**: Frontend desarrollado con tecnologías modernas
- **API RESTful**: Backend robusto con endpoints bien estructurados
- **Base de Datos SQLite**: Sistema de almacenamiento ligero y eficiente
- **Arquitectura Modular**: Separación clara entre frontend y backend
- **Validación de Datos**: Implementación de validaciones tanto en frontend como backend

## 🛠 Tecnologías

### Frontend
- **HTML5/CSS3**: Estructura y estilos
- **JavaScript**: Lógica del lado del cliente
- **Framework/Librería**: (Especificar si usa React, Vue, etc.)

### Backend
- **Python**: Lenguaje de programación principal
- **Framework**: (Django/Flask - especificar según tu implementación)
- **SQLite**: Base de datos

### Herramientas de Desarrollo
- **Git**: Control de versiones
- **Requirements.txt**: Gestión de dependencias de Python

## 📁 Estructura del Proyecto

```
SENATINOS-CRUD/
├── api/                    # Módulo API
├── crud_backend/          # Lógica del backend
├── frontend/              # Interfaz de usuario
├── db.sqlite3            # Base de datos SQLite
├── manage.py             # Script de gestión del proyecto
├── requirements.txt      # Dependencias de Python
├── .gitignore           # Archivos excluidos de Git
├── README.md            # Documentación del proyecto
├── TESTING.md           # Documentación de pruebas
└── tatus               # Estado del proyecto

```

## 🚀 Instalación

### Prerrequisitos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/joelPalaciosLaricano/SENATINOS-CRUD.git
   cd SENATINOS-CRUD
   ```

2. **Crear un entorno virtual (recomendado)**
   ```bash
   python -m venv venv
   
   # En Windows
   venv\Scripts\activate
   
   # En macOS/Linux
   source venv/bin/activate
   ```

3. **Instalar dependencias**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configurar la base de datos**
   ```bash
   python manage.py migrate
   ```

5. **Crear un superusuario (opcional)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Ejecutar el servidor de desarrollo**
   ```bash
   python manage.py runserver
   ```

7. **Acceder a la aplicación**
   - Abrir el navegador en: `http://localhost:8000`

## 💻 Uso

### Funcionalidades Principales

1. **Crear Registro**
   - Completar el formulario con la información requerida
   - Hacer clic en "Guardar" para crear el nuevo registro

2. **Ver Registros**
   - La página principal muestra todos los registros en formato de tabla
   - Utilizar los filtros para búsquedas específicas

3. **Actualizar Registro**
   - Hacer clic en el botón "Editar" del registro deseado
   - Modificar la información en el formulario
   - Guardar los cambios

4. **Eliminar Registro**
   - Hacer clic en el botón "Eliminar" del registro
   - Confirmar la acción en el modal de confirmación

## 🔌 API Endpoints

### Estudiantes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/students/` | Obtener todos los estudiantes |
| POST | `/api/students/` | Crear nuevo estudiante |
| GET | `/api/students/{id}/` | Obtener estudiante específico |
| PUT | `/api/students/{id}/` | Actualizar estudiante |
| DELETE | `/api/students/{id}/` | Eliminar estudiante |

### Ejemplo de Respuesta JSON

```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "fecha_registro": "2024-01-15T10:30:00Z",
  "activo": true
}
```

## 🗄 Base de Datos

El proyecto utiliza SQLite como sistema de gestión de base de datos. Las tablas principales incluyen:

- **Students**: Información de estudiantes
- **Courses**: Cursos disponibles
- **Enrollments**: Matriculaciones
- **Grades**: Calificaciones

### Migrar cambios en la base de datos

```bash
python manage.py makemigrations
python manage.py migrate
```

## 🧪 Pruebas

Para ejecutar las pruebas del proyecto:

```bash
python manage.py test
```

Para más información sobre las pruebas, consultar `TESTING.md`.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### Estilo de Código

- Seguir las convenciones de PEP 8 para Python
- Usar nombres descriptivos para variables y funciones
- Documentar funciones y clases importantes
- Escribir pruebas para nuevas funcionalidades

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autores

- GitHub: [@joelPalaciosLaricano](https://github.com/joelPalaciosLaricano)
- GitHub: [@goldz9999](https://github.com/goldz9999)
- GitHub: [@evp2005](https://github.com/evp2005)
- GitHub: [@MiguelQuijano1](https://github.com/MiguelQuijano1)
- GitHub: [@Jaime-D-Z](https://github.com/Jaime-D-Z)

## 🙏 Agradecimientos

- A todos los colaboradores del proyecto
- A la comunidad de desarrollo de código abierto
- Recursos educativos y documentación utilizada

## 📚 Recursos Adicionales

- [Documentación de Django](https://docs.djangoproject.com/) (si aplica)
- [Guía de Python](https://docs.python.org/)
- [Tutorial de Git](https://git-scm.com/docs/gittutorial)

## 🔄 Historial de Versiones

- **v1.0.0** - Versión inicial con funcionalidades CRUD básicas
- **v1.1.0** - Mejoras en la interfaz de usuario
- **v1.2.0** - Implementación de validaciones avanzadas

---

⭐ **¡No olvides darle una estrella al proyecto si te ha sido útil!**
