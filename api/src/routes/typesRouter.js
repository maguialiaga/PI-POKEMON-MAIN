const { Router } = require("express");
const { axios } = require("axios");
const { Pokemon, Type } = require("../models");

const typesRouter = Router();

module.exports = typesRouter;
