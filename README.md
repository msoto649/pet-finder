# 🐾 PetFinder

![PetFinder Logo](https://placehold.co/800x200/f97316/white?text=PetFinder+-+Encuentra+y+Reporta+Mascotas+Perdidas)

**Aplicación web para reportar y encontrar mascotas perdidas con sistema de recompensas**

## 📖 Descripción del Proyecto

PetFinder es una plataforma comunitaria dedicada a reunir mascotas perdidas con sus familias. Permite a los usuarios reportar mascotas perdidas con información detallada, buscar entre las mascotas reportadas, y conectar a las personas que han encontrado mascotas con sus dueños.

## ✨ Características Principales

- 🔍 **Búsqueda avanzada** - Filtros por especie, ubicación y estado
- 📝 **Reportes detallados** - Formulario completo con foto, descripción y ubicación
- 💰 **Sistema de recompensas** - Los usuarios pueden ofrecer recompensas por encontrar sus mascotas
- 📱 **Diseño responsive** - Funciona perfectamente en móviles, tablets y desktop
- 🎨 **Interfaz intuitiva** - Diseño moderno y fácil de usar con Tailwind CSS
- 🗺️ **Ubicación por ciudad** - Filtra mascotas por ubicación geográfica
- 📊 **Estadísticas en tiempo real** - Visualiza el impacto de la comunidad

## 🚀 Tecnologías Utilizadas

- **React 19.2.0** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite 7.2.4** - Herramienta de construcción rápida para desarrollo
- **React Router DOM 7.1.1** - Navegación entre páginas
- **Tailwind CSS 3.4.17** - Framework CSS para estilos modernos
- **PostCSS & Autoprefixer** - Procesamiento de CSS

## 📦 Instalación

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn

### Pasos de instalación

1. Clona el repositorio:
```bash
git clone https://github.com/msoto649/pet-finder.git
cd pet-finder
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🏗️ Estructura del Proyecto

```
pet-finder/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx         # Barra de navegación
│   │   │   ├── Footer.jsx         # Pie de página
│   │   │   └── Button.jsx         # Componente de botón reutilizable
│   │   └── pets/
│   │       ├── PetCard.jsx        # Tarjeta individual de mascota
│   │       ├── PetList.jsx        # Grid de tarjetas de mascotas
│   │       └── PetForm.jsx        # Formulario de reporte
│   ├── pages/
│   │   ├── Home.jsx               # Página de inicio
│   │   ├── SearchPets.jsx         # Página de búsqueda
│   │   └── ReportPet.jsx          # Página de reporte
│   ├── data/
│   │   └── mockPets.js            # Datos de ejemplo
│   ├── styles/
│   │   └── index.css              # Estilos globales con Tailwind
│   ├── App.jsx                    # Componente principal con rutas
│   ├── App.css                    # Estilos del App
│   └── main.jsx                   # Punto de entrada
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la build de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## 🎨 Paleta de Colores

- **Primary (Orange/Amber)**: Cálido y amigable, representa la calidez de las mascotas
  - `#f97316` (primary-500)
  - Variantes: 50-900

- **Secondary (Blue)**: Confianza y profesionalismo
  - `#3b82f6` (secondary-500)
  - Variantes: 50-900

- **Success (Green)**: Mascotas encontradas
- **Danger (Red)**: Mascotas perdidas
- **Neutral (Gray)**: Elementos de UI

## 🖼️ Screenshots

> *Screenshots pendientes - se agregarán después del primer deployment*

### Página de Inicio
![Home Page](https://placehold.co/800x600/f97316/white?text=Home+Page)

### Búsqueda de Mascotas
![Search Page](https://placehold.co/800x600/3b82f6/white?text=Search+Page)

### Formulario de Reporte
![Report Form](https://placehold.co/800x600/ea580c/white?text=Report+Form)

## 🗺️ Roadmap

### Fase 1 - Completada ✅
- [x] Estructura básica del proyecto
- [x] Diseño responsive
- [x] Navegación entre páginas
- [x] Componentes principales
- [x] Datos mock

### Fase 2 - Próximamente 🚀
- [ ] Backend con Node.js/Express
- [ ] Base de datos (MongoDB/PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Upload real de imágenes
- [ ] Sistema de notificaciones
- [ ] Chat en tiempo real
- [ ] Integración con mapas (Google Maps)
- [ ] Geolocalización

### Fase 3 - Futuro 🌟
- [ ] App móvil (React Native)
- [ ] Sistema de verificación
- [ ] Programa de voluntarios
- [ ] Compartir en redes sociales
- [ ] Estadísticas avanzadas
- [ ] Alertas por email/SMS

## 🤝 Cómo Contribuir

¡Las contribuciones son bienvenidas! Si deseas contribuir al proyecto:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de contribución

- Sigue las convenciones de código existentes
- Escribe mensajes de commit descriptivos
- Agrega tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Initial Development** - [msoto649](https://github.com/msoto649)

## 🙏 Agradecimientos

- Gracias a todas las personas que ayudan a reunir mascotas con sus familias
- Inspirado en la necesidad real de una plataforma comunitaria para mascotas perdidas
- Iconos de [Heroicons](https://heroicons.com/)
- Imágenes placeholder de [Placedog](https://placedog.net/) y [PlaceCats](https://placecats.com/)

## 📞 Contacto

- **Proyecto**: [https://github.com/msoto649/pet-finder](https://github.com/msoto649/pet-finder)
- **Issues**: [https://github.com/msoto649/pet-finder/issues](https://github.com/msoto649/pet-finder/issues)

---

<p align="center">
  Hecho con ❤️ para ayudar a reunir mascotas con sus familias
</p>
