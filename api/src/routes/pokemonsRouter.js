const { Router } = require("express");
const { axios } = require("axios");
const { Pokemon, Type } = require("../db");

const pokemonsRouter = Router();

//Obtener un listado de los pokemons desde pokeapi
//Debe devolver solo los datos necesarios para la ruta principal
pokemonsRouter.get("/", async (req, res) => {});

// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes
pokemonsRouter.get("/:idPokemon", (req, res) => {});

module.exports = pokemonsRouter;
