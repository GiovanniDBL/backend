const express = require('express');
const userController = require('../controllers/reports.controller');
const userLogin = require('../controllers/Auth.controller');
const getTickets = require('../controllers/Tickets.controller');
const Notas = require('../controllers/notas.controller');
const api = express.Router();
const multer = require('multer');
const path = require('path');
const app = express();
const connection = require('../database/db')



// *Ruta para guardar las img

app.use('../uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {

        callback(null, 'uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });


//? ************   RUTAS  ************

//* FILES
api.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;

    const filesimg = {
        multimedia: file.path
    }

    if (!file) {
        const error = new Error('No file');
        error.httpStatusCode = 400;


        return next(error);
    }
    res.send(file);
    console.log(filesimg);
});

//* Crear Reportes
api.post('/reportes', userController.newReport);
//* Auth Login
api.post('/login', userLogin.AuthController);
//* Crear Nuevos Usuarios *Solo para pruebas
api.post('/', userController.newUser);
// *Traer todos los departamentos existentes
api.get('/departamento', userController.getDepartamento)

//* Traer todos los reportes a la seccion del panel "Tickets"
api.get('/getReports', getTickets.TraerTickets);
//* Traer todos los reportes a la seccion del panel "Tickets"
api.get('/getReports/:departamento', getTickets.TraerTickets);
//* Filtrar los reportes a la seccion del panel "Tickets"
api.get('/verTickets/:id_reporte', getTickets.VerTickets);
//* Eliminar tickets del panel
api.delete('/deleteReports/:id', getTickets.EliminarTickets);

//? ...........   RUTAS LOGIN AUTHENTIATION PANEL EASYACCESS  ........

api.post('/register', userLogin.NuevoUsuario);
api.post('/loginpanel', userLogin.LoginPanel);

//? RUTA CREAR NOTA PARA REPORTES DEL PANEL .............
api.post('/CrearNota', Notas.CrearNota);
api.get('/TraerNotas/:id_reporte', Notas.TraerNotas);
api.delete('/EliminarNota/:id', Notas.EliminarNotas)


module.exports = api;