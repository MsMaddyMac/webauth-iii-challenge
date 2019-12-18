const router = require('express').Router();

const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

router.get('/', restricted, (req, res) => {
	Users.find()
		.then(users => {
			res.json(users);
		})
		.catch(err => {
			console.log('Not authorized to see users.', err);
			res.json({ message: 'You shall not pass!' });
		});
});

module.exports = router;
