# API REST: Tareas y Usuarios

## 1. Definir una ruta para cada entidad

- **Tareas** → `/api/tasks`
- **Usuarios** → `/api/auth`

## 2. Cada pedido (query) tiene internamente definido qué quiere hacer con la data

Utilizamos los métodos HTTP:

- `GET` – Obtener datos
- `POST` – Crear datos
- `PUT` / `PATCH` – Actualizar datos
- `DELETE` – Eliminar datos

### Ejemplo:

> Quiero borrar una tarea:

```http
DELETE https://miservidor.com/api/tasks/1
