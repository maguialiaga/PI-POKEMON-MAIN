const { Router } = require("express");
const { axios } = require("axios");
const { Pokemon, Type } = require("../db");

const typesRouter = Router();

module.exports = typesRouter;
