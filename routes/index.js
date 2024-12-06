const express = require('express');
const router = express.Router();
const User = require('../controllers/UsuarioController');
const Rol = require('../controllers/RolController');

router.get('/get/rol/:id', Rol.getRol);
router.get('/get/rols', Rol.getRols);
router.post('/create/rol', Rol.createRol);

router.post('/create/user', User.createUser);

module.exports = router;