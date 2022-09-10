const express = require('express');
const {auth} = require('../controller')

const routes = express.Router();

routes.post('/login', auth.login);


module.exports = routes;