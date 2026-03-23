# Edu Integral

Proyecto base con backend MVC en Node.js + Express y una interfaz conectada a un backend local.

## Qué incluye

- Inicio de sesión por roles (docente y alumno)
- Dashboard docente con monitoreo, alertas SOS y métricas rápidas
- Panel de alumno con tareas, avance, sesión activa y simulación de interacción IoT
- API REST sencilla para conectar la interfaz con el backend
- Modo demo en memoria para correr sin MySQL

## Ejecutar

```bash
npm install
npm run dev
```

Abrir en el navegador:

```bash
http://localhost:5600/login
```

## Credenciales demo

### Docente
- Usuario: `daniel`
- Correo: `admin@edu.com`
- Contraseña: `1234`

### Alumno
- Usuario: `kevin`
- Correo: `kevin@edu.com`
- Contraseña: `1234`

También existen: `elena`, `diego`, `ana` con la misma contraseña.

## Rutas principales

- `POST /api/auth/login`
- `GET /api/docente/dashboard`
- `GET /api/docente/alertas`
- `POST /api/docente/alertas/:id/resolver`
- `GET /api/alumno/:id/resumen`
- `GET /api/alumno/:id/tareas`
- `POST /api/alumno/:id/tareas/:idTarea/completar`
- `POST /api/alumno/:id/sos`
- `POST /api/alumno/:id/interacciones`
