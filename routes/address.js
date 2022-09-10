const express = require('express');
const {address} = require('../controller')
const {verifyToken} = require('../middleware/token');

const routes = express.Router();

routes.get('/:id', verifyToken, address.getAddress);
routes.get('/kota/:id', verifyToken, address.kota);


module.exports = routes;