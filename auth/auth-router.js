const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model');

router.post('/register', (req, res) => {
    let user = req.body;
    const rounds = process.env.HASH_ROUNDS || 14;
    const hash = bcrypt.hashSync(user.password, rounds);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: 'error.message' });
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .then(([user]) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.loggedIn = true;
                res.status(200).json({ message: 'welcome' });
            } else {
                res.status(401).json({ message: 'You shall not pass!(Login)' });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: error.message });
        });
});

module.exports = router;