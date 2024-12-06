const { Solicitud } = require('../models');

module.exports = {
    createSolicitud: async (req, res) => {
        try {
            const solicitud = await Solicitud.create(req.body);
            res.status(201).send({data: solicitud});
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: error.errors.map(err => err.message)
                });
            }
            
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to create the solicitud' });
        }
    },

    getSolicitud: async (req, res) => {
        try {
            const solicitud = await Solicitud.findByPk(req.params.id);
            res.status(200).send({data: solicitud});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the solicitud' });
        }
    },

    getSolicitudes: async (req, res) => {
        try {
            const solicitudes = await Solicitud.findAll();
            res.status(200).send({data: [solicitudes]});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the solicitudes' });
        }
    },
};