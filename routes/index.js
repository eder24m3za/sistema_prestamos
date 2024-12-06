const express = require('express');
const router = express.Router();
const User = require('../controllers/UsuarioController');
const Rol = require('../controllers/RolController');
const Prestamo = require('../controllers/PrestamoController');
const Payment = require('../controllers/PaymentController');
const Solicitud = require('../controllers/SolicitudController');
const Transaccion = require('../controllers/TransaccionController');
const Documentacion = require('../controllers/DocumentacionController');

router.get('/get/rol/:id', Rol.getRol);
router.get('/get/rols', Rol.getRols);
router.post('/create/rol', Rol.createRol);

router.post('/create/user', User.createUser);
router.get('/get/user/:id', User.getUser);
router.get('/get/users', User.getUsers);
router.get('/get/users/rol/:id', User.getUsersByRol);

router.post('/create/prestamo', Prestamo.createPrestamo);
router.get('/get/prestamo/:id', Prestamo.getPrestamo);
router.get('/get/prestamos', Prestamo.getPrestamos);
router.get('/get/prestamos/user/:id', Prestamo.getPrestamosByUsuario);

router.post('/create/payment', Payment.createPayment);
router.get('/get/payment/:id', Payment.getPayment);
router.get('/get/payments', Payment.getPayments);
router.get('/get/payments/prestamo/:id', Payment.getPaymentsByPrestamo);

router.post('/create/solicitud', Solicitud.createSolicitud);
router.get('/get/solicitud/:id', Solicitud.getSolicitud);
router.get('/get/solicitudes', Solicitud.getSolicitudes);

router.post('/create/transaccion', Transaccion.createTransaccion);
router.get('/get/transaccion/:id', Transaccion.getTransaccion);
router.get('/get/transacciones', Transaccion.getTransacciones);

router.post('/create/documentacion', Documentacion.createDocumentacion);
router.get('/get/documentacion/:id', Documentacion.getDocumentacion);
router.get('/get/documentaciones', Documentacion.getDocumentaciones);

router.use('/files', express.static('files'));

module.exports = router;