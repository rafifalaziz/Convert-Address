const express = require("express");
const auth = require("./auth");
const address = require("./address");

const routes = express.Router();

routes.use('/auth', auth);
routes.use('/address', address);

module.exports = routes;