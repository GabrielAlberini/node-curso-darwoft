# API REST: Tareas y Usuarios

Este proyecto es una API RESTful desarrollada en Node.js y TypeScript, que permite la gestión de tareas y usuarios. Utiliza Express como framework principal y MongoDB como base de datos, con autenticación basada en JWT.

## Funcionalidades principales

- **Usuarios**: Registro y login de usuarios con autenticación JWT.
- **Tareas**: CRUD de tareas asociadas a cada usuario autenticado.
- **Validación**: Validación de datos de entrada usando Zod.
- **Protección de rutas**: Solo usuarios autenticados pueden acceder a las rutas de tareas.

## Rutas principales

- **Usuarios** → `/api/auth`
  - `POST /register` - Registro de usuario
  - `POST /login` - Login de usuario
- **Tareas** → `/api/tasks`
  - `GET /` - Obtener todas las tareas del usuario autenticado
  - `POST /` - Crear una nueva tarea
  - `PATCH /:id` - Actualizar una tarea existente
  - `DELETE /:id` - Eliminar una tarea

## Requisitos

- Node.js >= 18.x
- MongoDB (local o en la nube)
- npm

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
URI_DB=mongodb://localhost:27017/tu_basededatos
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES=86400
PORT=1234
```

Tambien puedes encontrar las declaraciones en el `.env.example`

Ajusta los valores según tu entorno.

## Instalación

1. Clona el repositorio y entra en la carpeta del proyecto.
2. Instala las dependencias:

   ```
   npm install
   ```

3. Compila el proyecto (opcional, para producción):

   ```
   npm run build
   ```

## Ejecución

- **Modo desarrollo** (con recarga automática):

  ```
  npm run dev
  ```

- **Modo producción** (tras compilar):

  ```
  npm start
  ```

El servidor quedará escuchando en el puerto definido en la variable de entorno `PORT` (por defecto, 1234).

## Ejemplo de uso

> Borrar una tarea:

```http
DELETE http://localhost:1234/api/tasks/1
```

Recuerda que para acceder a las rutas de tareas necesitas enviar el token JWT en la cabecera `Authorization` como `Bearer <token>`.

## 2. Cada pedido (query) tiene internamente definido qué quiere hacer con la data

Utilizamos los métodos HTTP:

- `GET` – Obtener datos
- `POST` – Crear datos
- `PATCH` – Actualizar datos
- `DELETE` – Eliminar datos

### Ejemplo:

> Quiero borrar una tarea:

```http
DELETE https://miservidor.com/api/tasks/1
