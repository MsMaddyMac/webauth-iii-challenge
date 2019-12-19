const router = require('express').Router();
const bcrypt = require('bcryptjs');


const Users = require('../users/users-model');
const signToken = require('../helpers/signToken');

// for all endpoints beginning with /api/auth
// POST endpoint to register a new user
router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;

	Users.add(user)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(err => {
			console.log('Error registering user.', err);
			res.status(500).json({ error: 'Error registering user.' });
		});
});

// POST endpoint to log user in
router.post('/login', (req, res) => {
	let { username, password } = req.body;

	Users.findBy({ username })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				//sign token
				const token = signToken(user);

				//send the token
				res.status(200).json({
					token,
					message: `Welcome ${user.username}!`
				});
			} else {
				res.status(401).json({ message: 'You shall not pass!' });
			}
		})
		.catch(error => {
			console.log('Error with login', error);
			res.status(500).json({ error: 'Problem with login.' });
		});
});

module.exports = router;
