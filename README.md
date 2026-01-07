# 🐾 Pet Finder - Encuentra o Reporta Mascotas Perdidas

![Pet Finder Banner](https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&h=300&fit=crop)

**Pet Finder** es una aplicación web que ayuda a reunir mascotas perdidas con sus dueños. Permite a los usuarios buscar mascotas perdidas, reportar mascotas encontradas y contactar directamente con los dueños.

---

## ✨ Características

- 🔍 **Búsqueda Avanzada**: Filtra por tipo de mascota, ubicación y estado (perdido/encontrado)
- 📝 **Reportar Mascotas**: Formulario completo con validación para reportar mascotas perdidas o encontradas
- 💰 **Sistema de Recompensas**: Ofrece recompensas para aumentar las posibilidades de encontrar tu mascota
- 💳 **Pagos Integrados**: Procesamiento de pagos seguro con Stripe
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
- **Stripe.js** - Procesamiento de pagos
- **@stripe/react-stripe-js** - Componentes de Stripe para React

### Backend

- **Node.js + Express** - API REST
- **MongoDB + Mongoose** - Base de datos
- **Stripe** - Plataforma de pagos
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas

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

2. **Instalar dependencias del frontend**

```bash
npm install
```

3. **Instalar dependencias del backend**

```bash
cd backend
npm install
```

4. **Configurar variables de entorno**

Crear un archivo `.env` en la carpeta `backend` con las siguientes variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
JWT_SECRET=your_jwt_secret

# Stripe Configuration (usar claves de TEST durante desarrollo)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

Crear un archivo `.env` en la carpeta raíz para el frontend:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

5. **Iniciar el backend**

```bash
cd backend
npm start
# o para desarrollo con hot reload
npm run dev
```

6. **Iniciar el frontend**

En otra terminal, desde la carpeta raíz:

```bash
npm run dev
```

7. **Abrir en el navegador**

```
http://localhost:5173
```

---

## 💳 Configuración de Stripe

### 1. Crear Cuenta en Stripe

1. Visita [stripe.com](https://stripe.com) y crea una cuenta
2. Accede al Dashboard de Stripe
3. Cambia al modo "Test" usando el toggle en la esquina superior derecha

### 2. Obtener las Claves API

1. Ve a **Developers** > **API keys**
2. Copia tu **Publishable key** (pk_test_...)
3. Copia tu **Secret key** (sk_test_...)
4. Guárdalas en los archivos `.env` correspondientes

### 3. Configurar Webhooks (Opcional)

1. Ve a **Developers** > **Webhooks**
2. Click en **Add endpoint**
3. URL del endpoint: `http://localhost:5000/api/webhooks/stripe`
4. Selecciona los eventos:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `payment_intent.canceled`
   - `transfer.created`
   - `transfer.failed`
5. Copia el **Signing secret** (whsec_...) y guárdalo en el `.env`

### 4. Tarjetas de Prueba

Durante el desarrollo, usa estas tarjetas de prueba de Stripe:

- **Éxito**: `4242 4242 4242 4242`
- **Pago rechazado**: `4000 0000 0000 0002`
- **Requiere autenticación**: `4000 0025 0000 3155`

Fecha de expiración: Cualquier fecha futura
CVC: Cualquier 3 dígitos
Código postal: Cualquier 5 dígitos

---

## 🔄 Flujo del Sistema de Recompensas

### 1. Crear Recompensa

1. El dueño reporta una mascota perdida
2. Marca la opción "Ofrecer Recompensa"
3. Ingresa el monto y su método de pago
4. El sistema crea una pre-autorización en Stripe
5. La recompensa queda en estado `pending`

### 2. Mascota Encontrada

1. Un usuario ve la mascota con recompensa
2. Reporta que la encontró
3. El sistema retiene el pago (estado `held`)
4. Se notifica al dueño

### 3. Confirmar Recuperación

1. El dueño confirma la recuperación en la app
2. El sistema procesa el pago al finder
3. Estado cambia a `paid`
4. La mascota cambia a estado `Reunido`

### 4. Cancelación

1. Si la mascota aparece sin recompensa
2. El dueño puede cancelar la recompensa
3. El sistema reembolsa/cancela la pre-autorización

---

## 📚 API Endpoints

### Mascotas

```
GET    /api/pets              - Obtener todas las mascotas
GET    /api/pets/:id          - Obtener una mascota por ID
POST   /api/pets              - Crear una mascota
PUT    /api/pets/:id          - Actualizar una mascota
DELETE /api/pets/:id          - Eliminar una mascota
```

### Recompensas

```
POST   /api/rewards              - Crear recompensa (requiere auth)
PUT    /api/rewards/:id          - Actualizar monto (requiere auth)
POST   /api/rewards/:id/hold     - Retener pago (requiere auth)
POST   /api/rewards/:id/release  - Liberar pago (requiere auth)
POST   /api/rewards/:id/cancel   - Cancelar recompensa (requiere auth)
GET    /api/rewards/pet/:petId   - Obtener recompensa por mascota
GET    /api/rewards/user         - Obtener recompensas del usuario (requiere auth)
```

### Transacciones

```
GET    /api/transactions/reward/:rewardId  - Historial de transacciones
GET    /api/transactions/user              - Transacciones del usuario (requiere auth)
```

### Autenticación

```
POST   /api/auth/register     - Registrar usuario
POST   /api/auth/login        - Iniciar sesión
GET    /api/auth/me           - Obtener usuario actual (requiere auth)
```

### Webhooks

```
POST   /api/webhooks/stripe   - Webhook de Stripe
```

---

## 🚀 Scripts Disponibles
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

### Frontend

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview
```

### Backend

```bash
# Iniciar servidor
npm start

# Iniciar con hot reload (desarrollo)
npm run dev
```

---

## 📁 Estructura del Proyecto (Actualizada)

```
pet-finder/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── stripe.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── petController.js
│   │   │   ├── rewardController.js
│   │   │   ├── transactionController.js
│   │   │   └── stripeWebhookController.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Pet.js
│   │   │   ├── Reward.js
│   │   │   └── Transaction.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── petRoutes.js
│   │   │   ├── rewards.js
│   │   │   └── transactions.js
│   │   ├── services/
│   │   │   └── stripeService.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── .env
│   └── package.json
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── pets/
│   │   └── rewards/
│   │       ├── RewardForm.jsx
│   │       ├── RewardBadge.jsx
│   │       ├── RewardDetails.jsx
│   │       ├── PaymentMethodForm.jsx
│   │       └── TransactionHistory.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── SearchPets.jsx
│   │   ├── ReportPet.jsx
│   │   ├── PetDetail.jsx
│   │   ├── MyRewards.jsx
│   │   └── NotFound.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── rewardService.js
│   │   └── stripeService.js
│   └── App.jsx
└── README.md
```

---

## 🎯 Características del Sistema de Recompensas

### Para Dueños
- ✅ Crear recompensas con pre-autorización de pago
- ✅ Actualizar el monto antes de que alguien encuentre la mascota
- ✅ Cancelar recompensas y obtener reembolso
- ✅ Confirmar recuperación y liberar pago al finder
- ✅ Ver historial de transacciones

### Para Finders
- ✅ Ver mascotas con recompensa
- ✅ Reportar que encontraron una mascota
- ✅ Recibir pago al ser confirmado por el dueño
- ✅ Ver historial de recompensas ganadas

### Seguridad
- 🔒 Pre-autorización de pagos con Stripe
- 🔒 Autenticación JWT
- 🔒 Validación de permisos
- 🔒 Encriptación de contraseñas
- 🔒 Webhooks verificados de Stripe

---

## ⚠️ Notas de Producción

- **Desarrollo**: Usa las claves de TEST de Stripe
- **Producción**: Cambia a las claves LIVE de Stripe antes de deployment
- **Stripe Connect**: Necesario para transferir fondos a los finders
- **Comisiones**: Considera las comisiones de Stripe (2.9% + $0.30 por transacción)
- **Regulaciones**: Cumple con las regulaciones de pagos locales

---

