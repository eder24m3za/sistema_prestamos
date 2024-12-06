const { Prestamo } = require('../models');

module.exports = {
    createPrestamo: async (req, res) => {
        try {
            const prestamo = await Prestamo.create(req.body);
            res.status(201).send({data: prestamo});
        } catch (error) {

            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: error.errors.map(err => err.message)
                });
            }

            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to create the prestamo' });
        }
    },

    getPrestamo: async (req, res) => {
        try {
            const prestamo = await Prestamo.findByPk(req.params.id);
            res.status(200).send({data: prestamo});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the prestamo' });
        }
    },

    getPrestamos: async (req, res) => {
        try {
            const prestamos = await Prestamo.findAll();
            res.status(200).send({data: [prestamos]});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the prestamos' });
        }
    },

    getPrestamosByUsuario: async (req, res) => {
        try {
            const prestamos = await Prestamo.findAll({
                where: {
                    usuario_id: req.params.id
                }
            });
            res.status(200).send({data: [prestamos]});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the prestamos' });
        }
    },

    getPrestamoById: async (req, res) => {
        try {
            const prestamo = await Prestamo.findByPk(req.params.id);
            res.status(200).send({data: prestamo});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the prestamo' });
        }
    }
};