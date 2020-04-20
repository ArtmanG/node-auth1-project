const router = require('express').Router();

const Users = require('./users-model.js');

console.log('hi from users-router');

router.get('/', (req, res) => {
    Users.find()
        .then(users => {
            console.log(users);
            res.json(users);
        })
        .catch(error => res.send(error));
});

module.exports = router;

