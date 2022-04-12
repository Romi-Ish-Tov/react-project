const express = require('express');
const cors = require('cors');

const server = express();

const vacationController = require('./controllers/vacations-controllers');
const usersController = require('./controllers/users-controllers');

server.use(cors({ origin: 'http://localhost:3000'}));
server.use(express.json());

server.use('/vacations', vacationController);
server.use('/users', usersController);

server.listen(3001, () => console.log('Listening on http://localhost:3001'));