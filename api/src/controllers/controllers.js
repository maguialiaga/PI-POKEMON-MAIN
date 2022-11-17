//Controllers

const axios = require("axios");
const { Pokemon, Type } = require("../db");

//Pokes que me trae la API
const getApiInfo = async () => {
  try {
    const primerosPokes = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const segundosPokes = await primerosPokes.data.next;
    const todosLosPokes = await primerosPokes.data.results.concat(
      segundosPokes.data.results
    );

    const infoPokes = await Promise.all(
      todosLosPokes.map(async (pokemon) => {
        let datosPoke = await axios.get(pokemon.url);
        return {
          id: datosPoke.data.id,
          name: datosPoke.data.name,
          hp: datosPoke.data.stats[0].base_stat,
          attack: datosPoke.data.stats[1].base_stat,
          defense: datosPoke.data.stats[2].base_stat,
          speed: datosPoke.data.stats[5].base_stat,
          height: datosPoke.data.height,
          weigth: datosPoke.data.weight,
          types: datosPoke.data.types.map((t) => t.type.name), // Le hago el .map para q me recorra el array y  me devuelva todos los tipos q puede llegar a ser mi pokemon, puede ser varios types dentro de ese array.
          image: datosPoke.data.sprites.other.dream_world.front_default,
        };
      })
    );
    return infoPokes;
  } catch (error) {
    console.log("error de getApiInfo", error);
  }
};

//Pokes q me trae mi DB
const getInfoDb = async () => {
  return await Pokemon.findAll({
    include: {
      model: Type,
      atributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
};

//Pokes fusion de la Api con DB
const getAllPokes = async () => {
  try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getInfoDb();
    const allInfo = await apiInfo.concat(dbInfo);
    return allInfo;
  } catch (error) {
    console.log("error de getAllPokes", error);
  }
};

module.exports = {
  getApiInfo,
  getInfoDb,
  getAllPokes,
};
