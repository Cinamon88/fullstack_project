const user = require('../models/user.model');
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    try {
        const { login, password } = req.body
        if (login && typeof login === 'string' && password && typeof password === 'string') {
            const userWithLogin = await user.findOne({ login });
            if (userWithLogin) {
                res.status(409).send({ message: 'User with this login already exists'});
            }   
            
            const user = await user.create({ login, password: await bcrypt.hash( password, 10) });
            res.status(201).send({ message: 'User created!' + user.login });
        }
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.login = async (req, res) => {
    
}