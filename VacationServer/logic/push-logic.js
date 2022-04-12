const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const expressServer = express();
const httpServer = http.createServer(expressServer);
const socketServer = socketIO.listen(httpServer);

