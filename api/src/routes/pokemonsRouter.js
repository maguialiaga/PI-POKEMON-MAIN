const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Type } = require("../db");
const {
  getApiInfo,
  getInfoDb,
  getAllPokes,
} = require("../controllers/controllers");

const pokemonsRouter = Router();

//GET
//Obtener un listado de los pokemons desde pokeapi
//Debe devolver solo los datos necesarios para la ruta principal
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado

pokemonsRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const allPokes = await getAllPokes();
    if (name) {
      const pokeName = allPokes.filter((poke) => {
        return poke.name.toLowerCase() === name.toLowerCase();
      });
      if (pokeName.length) {
        res.status(200).send(pokeName);
      } else {
        res.status(400).send("pokeName not found");
      }
    } else {
      res.status(200).send(allPokes);
    }
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
});

// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes

pokemonsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allPokes = await getAllPokes();
    const pokeId = allPokes.find((poke) => {
      return poke.id === parseInt(id);
    });
    if (pokeId) {
      res.status(200).send(pokeId);
    } else {
      res.status(400).send("pokeId not found");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//POST
//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.

pokemonsRouter.post("/", async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weigth, types } =
      req.body;
    if (
      !name ||
      !hp ||
      !attack ||
      !defense ||
      !speed ||
      !height ||
      !weigth ||
      !types
    ) {
      res.status(400).send("missing info");
    } else {
      const newPoke = await Pokemon.create(req.body);
      res.status(200).send(newPoke);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = pokemonsRouter;
