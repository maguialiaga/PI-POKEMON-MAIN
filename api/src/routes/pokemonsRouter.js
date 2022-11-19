const { Router } = require("express");
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

//POST
//Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// imagen, nombre y tipos
// número de Pokemon (id)
// Estadísticas (vida, ataque, defensa, velocidad)
// Altura y peso
// Crea un pokemon en la base de datos relacionado con sus tipos.

pokemonsRouter.post("/", async (req, res) => {
  try {
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
      image,
      createdInDB,
      //en el insomnia no se lo paso pero me tiene q llegar q fue creado en Db
    } = req.body;

    let urlImg = "";
    if (image) {
      urlImg = image;
    } else {
      urlImg =
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Pokebola-pokeball-png-0.png";
    }
    if (name && hp && attack && defense && speed && height && weight && types) {
      const newPoke = Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        image: urlImg,
        createdInDB,
      });

      const typeDb = await Type.findAll({ where: { name: types } });
      //aca tengo q encontrar en mi tabla Types todos los tipos con el mismo nombre q me llegan por body

      newPoke.addType(typeDb); //concecto ambas tablas asi
      res.status(200).send("new Poke created");
    } else {
      res.status(400).send("missing info");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
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

module.exports = pokemonsRouter;
