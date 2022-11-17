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

router.use("/pokemons", pokemonsRouter);
router.use("/types", typesRouter);

module.exports = router;
