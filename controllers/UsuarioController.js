const { Usuario } = require('../models');

module.exports = {
    createUser: async (req, res) => {
        try {
            const user = await Usuario.create(req.body);
            res.status(201).send(user);
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: 'There was a problem trying to create the user' });
        }
    },

    
};