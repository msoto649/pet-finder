# 🐾 Pet Finder - Encuentra o Reporta Mascotas Perdidas

![Pet Finder Banner](https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=300&fit=crop)

**Pet Finder** es una aplicación web que ayuda a reunir mascotas perdidas con sus dueños. Permite a los usuarios buscar mascotas perdidas, reportar mascotas encontradas y contactar directamente con los dueños.

---

## ✨ Características

- 🔍 **Búsqueda Avanzada**: Filtra por tipo de mascota, ubicación y estado (perdido/encontrado)
- 📝 **Reportar Mascotas**: Formulario completo con validación para reportar mascotas perdidas o encontradas
- 🐾 **Página de Detalle**: Información completa de cada mascota con datos de contacto
- 📱 **Diseño Responsive**: Funciona perfectamente en móviles, tablets y desktop
- 🎨 **UI Moderna**: Interfaz limpia y atractiva con Tailwind CSS
- ⚡ **Rápido**: Construido con Vite para desarrollo ultrarrápido

---

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18** - Biblioteca de UI
- **React Router DOM** - Navegación entre páginas
- **Tailwind CSS** - Estilos y diseño responsive
- **Vite** - Build tool y dev server

### Backend (En desarrollo)

- Node.js + Express
- MongoDB
- Mongoose

---

## 📦 Instalación

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/msoto649/pet-finder.git
cd pet-finder
```

Instalar dependencias
bash
npm install
Iniciar el servidor de desarrollo
bash
npm run dev
Abrir en el navegador
Code
http://localhost:5173
📁 Estructura del Proyecto
Code
pet-finder/
├── src/
│ ├── components/
│ │ ├── common/
│ │ │ ├── Button.jsx
│ │ │ ├── Header. jsx
│ │ │ ├── Footer.jsx
│ │ │ └── SearchBar.jsx
│ │ └── pets/
│ │ ├── PetCard. jsx
│ │ └── PetList.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── SearchPets.jsx
│ │ ├── ReportPet.jsx
│ │ ├── PetDetail.jsx
│ │ └── NotFound.jsx
│ ├── data/
│ │ └── mockPets.js
│ ├── App.jsx
│ ├── main. jsx
│ └── index. css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
🚀 Scripts Disponibles
bash

# Iniciar servidor de desarrollo

npm run dev

# Construir para producción

npm run build

# Previsualizar build de producción

npm run preview
📸 Screenshots
Página de Inicio
![Home Page](https://via.placeholder.com/800x400?text=Home+Page)

Búsqueda de Mascotas
![Search Page](https://via.placeholder.com/800x400?text=Search+Page)

Detalle de Mascota
![Pet Detail](https://via.placeholder.com/800x400?text=Pet+Detail)

🎯 Próximas Funcionalidades
Conectar con backend real (Node. js + MongoDB)
Autenticación de usuarios
Sistema de mensajería interno
Mapa interactivo de mascotas
Notificaciones por email
Subida de múltiples imágenes
Filtros geográficos avanzados
Sistema de comentarios
🤝 Contribuir
Las contribuciones son bienvenidas. Para contribuir:

Fork el proyecto
Crea una rama para tu feature (git checkout -b feature/AmazingFeature)
Commit tus cambios (git commit -m 'Add some AmazingFeature')
Push a la rama (git push origin feature/AmazingFeature)
Abre un Pull Request
📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

👤 Autor
Misael Junior Soto Fuentes
GitHub: @msoto649

🙏 Agradecimientos
Imágenes de Unsplash
Iconos de emojis nativos
Comunidad de React y Tailwind CSS
📧 Contacto
¿Preguntas o sugerencias? Abre un issue o contáctame directamente.

<div align="center">
⭐ Si te gusta este proyecto, dale una estrella en GitHub ⭐

Hecho con ❤️ y React

</div> ```
