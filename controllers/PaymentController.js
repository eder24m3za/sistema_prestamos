const { Payment } = require('../models');

module.exports = {
    createPayment: async (req, res) => {
        try {
            const payment = await Payment.create(req.body);
            res.status(201).send({data: payment});
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: error.errors.map(err => err.message)
                });
            }
            
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to create the payment' });
        }
    },

    getPayment: async (req, res) => {
        try {
            const payment = await Payment.findByPk(req.params.id);
            res.status(200).send({data: payment});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the payment' });
        }
    },

    getPayments: async (req, res) => {
        try {
            const payments = await Payment.findAll();
            res.status(200).send({data: [payments]});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the payments' });
        }
    },

    getPaymentsByPrestamo: async (req, res) => {
        try {
            const payments = await Payment.findAll({
                where: {
                    prestamo: req.params.id
                }
            });
            res.status(200).send({data: [payments]});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the payments' });
        }
    }
};

