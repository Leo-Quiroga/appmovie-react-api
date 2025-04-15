🎬 CineTech - Buscador de Películas Moderno
📝 Descripción

CineTech es una aplicación moderna de búsqueda de películas desarrollada con React, que utiliza la API de The Movie Database (TMDB) para ofrecer información detallada sobre películas, con un diseño atractivo y efectos visuales dinámicos.

✨ Características Principales

    Interfaz elegante 

    Búsqueda en tiempo real con debounce para mejor rendimiento

    Películas destacadas en la pantalla principal

    Diseño responsive para móviles y desktop

    Detalles completos: título, descripción, calificación, fecha de lanzamiento

    Animaciones fluidas con CSS moderno

🛠️ Tecnologías Utilizadas

    Frontend: React 18 + Vite

    Estilos: CSS Modules + Variables CSS

    API: The Movie Database (TMDB)

    Efectos UI: Glassmorphism

🚀 Instalación y Uso
Requisitos previos

    Node.js (v16 o superior)

    npm (v8 o superior)

Pasos de instalación

Clonar el repositorio

git clone https://github.com/Leo-Quiroga/appmovie-react-api

Instalar dependencias

npm install

Configurar API key

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

VITE_TMDB_API_KEY=tu_clave_real_aqui

Iniciar la aplicación

npm run dev

💡 Puedes obtener una API KEY gratuita en: https://www.themoviedb.org/documentation/api

🎨 Personalización

Puedes modificar los estilos editando las variables CSS en el archivo src/MovieApp.css:


:root {
  --primary-color: #8e46d2;       /* Color principal */
  --secondary-color: #ff4d89;     /* Color secundario */
  --glass-opacity: 0.2;           /* Intensidad efecto glass */
  --animation-speed: 0.3s;        /* Velocidad transiciones */
}

🤝 Cómo Contribuir

- Haz un fork del proyecto

- Crea una rama con tu feature:


git checkout -b feature/nueva-funcion

- Haz commit de tus cambios:

git commit -m 'Añade nueva funcionalidad'

- Haz push a la rama:


git push origin feature/nueva-funcion

Abre un Pull Request

📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
📬 Contacto

✉️ Email: hleonardoquirogab@hotmail.com

🔗 GitHub: https://github.com/Leo-Quiroga
