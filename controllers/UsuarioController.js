const { Usuario } = require('../models');

module.exports = {
    createUser: async (req, res) => {
        try {
            const user = await Usuario.create(req.body);
            res.status(201).send(user);
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                return res.status(400).json({
                    message: 'Validation error',
                    errors: error.errors.map(err => err.message)
                });
            }
            
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to create the user' });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await Usuario.findByPk(req.params.id);
            res.status(200).send({data: user});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the user' });
        }
    },

    getUsers: async (req, res) => {
        try {
            const users = await Usuario.findAll();
            res.status(200).send({data: [users]});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the users' });
        }
    },

    getUsersByRol: async (req, res) => {
        try {
            const users = await Usuario.findAll({
                where: {
                    rol_id: req.params.id
                }
            });
            res.status(200).send({data: [users]});
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to get the users' });
        }
    }
    
};