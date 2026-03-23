const express = require('express');
const path = require('path');
const cors = require('cors');

const AlumnoModel = require('./app/models/Alumno');
const AlumnoController = require('./app/controllers/AlumnoController');
const DocenteController = require('./app/controllers/DocenteController');

const app = express();
const PORT = Number(process.env.PORT || 5600);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/preview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/docente/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'views', 'docente', 'dashboard.html'));
});

app.get('/alumno/app/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'app', 'views', 'alumno', 'app_alumno.html'));
});

app.get('/api/health', (req, res) => {
    res.json({ ok: true, message: 'Servidor activo.' });
});

app.post('/api/auth/login', (req, res) => {
    const { identificador, password } = req.body;
    const usuario = AlumnoModel.autenticar(identificador, password);

    if (!usuario) {
        return res.status(401).json({ ok: false, message: 'Credenciales inválidas.' });
    }

    return res.json({ ok: true, data: usuario });
});

app.get('/api/docente/dashboard', DocenteController.dashboard);
app.get('/api/docente/alertas', DocenteController.listarAlertas);
app.post('/api/docente/alertas/:id/resolver', DocenteController.resolverAlerta);

app.get('/api/alumno/:id/resumen', AlumnoController.obtenerResumen);
app.get('/api/alumno/:id/tareas', AlumnoController.obtenerTareas);
app.post('/api/alumno/:id/tareas/:idTarea/completar', AlumnoController.completarTarea);
app.post('/api/alumno/:id/sos', AlumnoController.registrarSOS);
app.post('/api/alumno/:id/interacciones', AlumnoController.registrarInteraccion);

app.use((req, res) => {
    res.status(404).json({ ok: false, message: 'Ruta no encontrada.' });
});

app.listen(PORT, () => {
    console.log(`Edu Integral ejecutándose en http://localhost:${PORT}`);
});
