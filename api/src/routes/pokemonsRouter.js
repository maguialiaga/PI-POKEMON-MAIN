const { Router } = require("express");
const { axios } = require("axios");
const { Pokemon, Type } = require("../models");

const pokemonsRouter = Router();

module.exports = pokemonsRouter;
