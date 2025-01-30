
# 📌 Sistema de Ventas Colegio

📢 **Descripción:**  
Este es un sistema de ventas desarrollado con Node.js y Express.js. Permite la gestión de clientes, productos, ventas y más. Cuenta con autenticación de usuarios mediante JWT y una interfaz basada en EJS y Bootstrap.



## 🛠️ Características
- **Gestión de productos:** Agregar, actualizar y eliminar productos.
- **Gestión de ventas:** Registrar nuevas ventas y obtener historial de ventas.
- **Autenticación de usuarios:** Login y logout mediante JWT para sesiones seguras.
- **Protección contra ataques comunes:** XSS y validación de datos en todas las entradas.
- **Interfaz sencilla y moderna**: Usando EJS y Bootstrap para una mejor experiencia de usuario.


## 🔧 Tecnologías Utilizadas

- **Backend:** Node.js, Express.js
- **Base de Datos:** SQL Server (mssql)
- **Autenticación:** JSON Web Tokens (JWT)
- **Frontend:** EJS, Bootstrap
- **Middleware:** Morgan, CORS, Cookie-parser


## 🔒 Seguridad
- **Autenticación** mediante JWT
- **Encriptación de contraseñas** con bcrypt
- **Validación de datos** en el backend
- **Protección contra XSS** (Cross-Site Scripting)
- **Implementación de CORS** para controlar accesos


## 📂 Estructura del Proyecto

```
cesarcunyarache-colegio/
├── package.json
└── src/
    ├── app.js
    ├── config.js
    ├── index.js
    ├── controllers/
    ├── database/
    ├── libs/
    ├── middlewares/
    ├── public/
    ├── routes/
    └── views/
```

📌 **Principales carpetas:**
- `controllers/` → Controladores de la API.
- `database/` → Conexión y configuración de la base de datos.
- `middlewares/` → Validaciones y middleware de autenticación.
- `public/` → Archivos estáticos (CSS, JS, imágenes).
- `routes/` → Rutas del backend.
- `views/` → Plantillas EJS para la interfaz de usuario.




## 📡 Endpoints Principales

📌 **Autenticación**
```sh
POST /login - Iniciar sesión
GET /logout - Cerrar sesión
```

📌 **Gestión de Productos**
```sh
GET /productos - Obtener productos
POST /productos - Crear producto
PUT /productos/:id - Actualizar producto
DELETE /productos/:id - Eliminar producto
```

📌 **Gestión de Ventas**
```sh
GET /ventas - Obtener ventas
POST /ventas - Crear venta
```

---


## 🚀 Instalación y Configuración

1️⃣ **Clonar el repositorio:**
```sh
git clone https://github.com/tu_usuario/sistema-ventas.git
cd sistema-ventas
```

2️⃣ **Instalar dependencias:**
```sh
npm install
```

3️⃣ **Iniciar el servidor:**
```sh
npm run dev
```

---
