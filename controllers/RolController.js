const { Rol } = require('../models');

module.exports = {
    createRol: async (req, res) => {
        try {
            // Crear el rol, si las validaciones fallan, lanzará un error automáticamente
            const rol = await Rol.create(req.body);
            res.status(201).send({
                message: 'Rol created successfully',
                data: rol
            });
        } catch (error) {
            console.error(error);
            
            // Si hay errores de validación, simplemente responder con el error
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: error.errors.map(err => err.message)
                });
            }
            
            // Si es otro tipo de error, manejamos el error general
            res.status(500).send({ message: 'There was a problem trying to create the rol' });
        }
    },

    getRol: async (req, res) => {
        try {
            const rol = await Rol.findByPk(req.params.id);
            if (!rol) {
                return res.status(404).send({ message: 'Rol not found' });
            }
            res.status(200).send(rol);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the rol' });
        }
    },

    getRols: async (req, res) => {
        try {
            const roles = await Rol.findAll();
            res.status(200).send(roles);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the roles' });
        }
    },
};