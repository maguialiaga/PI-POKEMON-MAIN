const express = require("express");
const { Router } = require("express");
const morgan = require("morgan");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonsRouter = require("./pokemonsRouter");
const typesRouter = require("./typesRouter");

const router = Router();

//Middlewares
router.use(express.json());
router.use(morgan("dev"));

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/types", typesRouter);
router.use("/pokemons", pokemonsRouter);

module.exports = router;
