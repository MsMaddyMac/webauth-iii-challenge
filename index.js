const server = require('./api/server');

const port = orcess.env.PORT || 5000;
server.listen(port, () => console.log('\n** Running on port ${port) **\n'));
