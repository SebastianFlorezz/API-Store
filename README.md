# Store API

API REST de comercio electrónico construida con **Express 5**, **Sequelize 7** y **MySQL**. Incluye autenticación JWT, gestión de productos, carrito de compras, pedidos y reseñas.

## Tecnologías

| Capa       | Tecnología                         |
| ---------- | ---------------------------------- |
| Runtime    | Node.js                            |
| Framework  | Express 5                          |
| ORM        | Sequelize 7 + MySQL                |
| Auth       | JWT + bcryptjs                     |
| Validación | express-validator                  |
| Documentación | Swagger (OpenAPI 3.0)           |

## Estructura del proyecto

```
store/
├── src/
│   ├── app.js                        # Punto de entrada
│   ├── config/
│   │   └── swagger.js                # Configuración de Swagger
│   ├── controllers/                  # Lógica de cada recurso
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   ├── productController.js
│   │   └── reviewController.js
│   ├── db/
│   │   └── index.js                  # Conexión a MySQL
│   ├── middleware/
│   │   ├── auth.js                   # Guard JWT + rol admin
│   │   ├── errorHandler.js           # Manejador global de errores
│   │   └── validate.js               # Ejecutor de validaciones
│   ├── models/
│   │   ├── index.js                  # Asociaciones + exportaciones
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   ├── categoryModel.js
│   │   ├── reviewModel.js
│   │   ├── cartItemModel.js
│   │   ├── orderModel.js
│   │   └── orderItemModel.js
│   └── routes/                       # Definición de rutas
│       ├── auth.js
│       ├── cart.js
│       ├── categories.js
│       ├── orders.js
│       ├── products.js
│       └── reviews.js
├── .env                              # Variables de entorno
├── package.json
├── seed.sql                          # Datos de prueba
└── README.md
```

## Requisitos previos

- Node.js 18+
- MySQL 8+
- npm

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/SebastianFlorezz/API-Store
cd store

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de MySQL

# 4. Crear la base de datos
mysql -u root -p -e "CREATE DATABASE store CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 5. Iniciar el servidor (sincroniza las tablas automáticamente)
npm run dev



## Variables de entorno

| Variable       | Descripción                     | Valor por defecto |
| -------------- | ------------------------------- | ----------------- |
| `PORT`         | Puerto del servidor             | `5000`            |
| `DATABASE`     | Nombre de la base de datos      | `store`           |
| `DB_USER`      | Usuario de MySQL                | `root`            |
| `DB_PASSWORD`  | Contraseña de MySQL             | —                 |
| `DB_HOST`      | Host de MySQL                   | `localhost`       |
| `JWT_SECRET`   | Clave secreta para firmar tokens | —                |

## Scripts disponibles

| Comando         | Descripción                                |
| --------------- | ------------------------------------------ |
| `npm run dev`   | Inicia el servidor con nodemon (recarga automática) |

## Documentación de la API

La documentación interactiva (Swagger UI) está disponible en:

```
http://localhost:5000/api/docs
```

Permite probar todos los endpoints directamente desde el navegador. Usa el botón **Authorize** para ingresar un token JWT y autenticar las rutas protegidas.

### Resumen de endpoints

| Método | Ruta                     | Auth    | Descripción                     |
| ------ | ------------------------ | ------- | ------------------------------- |
| POST   | `/api/auth/register`     | —       | Registrar un nuevo usuario      |
| POST   | `/api/auth/login`        | —       | Iniciar sesión                  |
| GET    | `/api/auth/me`           | Usuario | Obtener perfil del usuario      |
| GET    | `/api/categories`        | —       | Listar categorías activas       |
| GET    | `/api/categories/:id`    | —       | Obtener categoría por ID        |
| POST   | `/api/categories`        | Admin   | Crear categoría                 |
| PUT    | `/api/categories/:id`    | Admin   | Actualizar categoría            |
| DELETE | `/api/categories/:id`    | Admin   | Eliminar categoría              |
| GET    | `/api/products`          | —       | Listar productos (con filtros)  |
| GET    | `/api/products/:id`      | —       | Obtener producto por ID         |
| POST   | `/api/products`          | Admin   | Crear producto                  |
| PUT    | `/api/products/:id`      | Admin   | Actualizar producto             |
| DELETE | `/api/products/:id`      | Admin   | Eliminar producto               |
| GET    | `/api/cart`              | Usuario | Ver carrito                     |
| POST   | `/api/cart`              | Usuario | Agregar producto al carrito     |
| PUT    | `/api/cart/:id`          | Usuario | Actualizar cantidad             |
| DELETE | `/api/cart/:id`          | Usuario | Eliminar item del carrito       |
| GET    | `/api/orders`            | Usuario | Listar pedidos del usuario      |
| GET    | `/api/orders/:id`        | Usuario | Obtener detalle del pedido      |
| POST   | `/api/orders`            | Usuario | Crear pedido desde el carrito   |
| GET    | `/api/reviews`           | —       | Listar reseñas (por producto)   |
| POST   | `/api/reviews`           | Usuario | Crear reseña                    |
| DELETE | `/api/reviews/:id`       | Usuario | Eliminar reseña                 |

### Filtros de productos

`GET /api/products` acepta los siguientes parámetros query:

| Parámetro  | Tipo    | Descripción                     |
| ---------- | ------- | ------------------------------- |
| `categoryId` | integer | Filtrar por categoría         |
| `search`     | string  | Buscar por nombre             |
| `minPrice`   | number  | Precio mínimo                 |
| `maxPrice`   | number  | Precio máximo                 |

## Modelo de datos

```
User ──1:N──> Review
User ──1:N──> CartItem
User ──1:N──> Order

Category ──1:N──> Product

Product ──1:N──> Review
Product ──1:N──> CartItem
Product ──1:N──> OrderItem

Order ──1:N──> OrderItem
```