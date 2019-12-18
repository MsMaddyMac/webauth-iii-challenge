const jwt = require('jsonwebtoken');

module.exports = function signToken(user) {
	const payload = {
		username: user.username
	};

	const secret = process.env.JWT_SECRET || 'pinky promise, please!';

	const options = {
		expiresIn: '1hr'
	};

	return jwt.sign(payload, secret, options);
};
