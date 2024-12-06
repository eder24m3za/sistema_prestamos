const { Transaccion } = require('../models');

module.exports = {
    createTransaccion: async (req, res) => {
        try {
            const transaccion = await Transaccion.create(req.body);
            res.status(201).send({data: transaccion});
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: error.errors.map(err => err.message)
                });
            }
            
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to create the transaccion' });
        }
    },

    getTransaccion: async (req, res) => {
        try {
            const transaccion = await Transaccion.findByPk(req.params.id);
            res.status(200).send({data: transaccion});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the transaccion' });
        }
    },

    getTransacciones: async (req, res) => {
        try {
            const transacciones = await Transaccion.findAll();
            res.status(200).send({data: [transacciones]});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the transacciones' });
        }
    }
};