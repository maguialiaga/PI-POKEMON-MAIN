const { Router } = require("express");
const { Type } = require("../db");
const {
  getApiInfo,
  getInfoDb,
  getAllPokes,
} = require("../controllers/controllers");

const typesRouter = Router();

// Obtener todos los "tipos" de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
//No los vuelve a traer, no se tiene q agregar 2 veces un "type" a la base de datos por eso usamos el findOrCreate para q no se vuelva a cargar con el mismo nombre q ya existe en mi BD

typesRouter.get("/", async (req, res) => {
  try {
    const allPokes = await getApiInfo();
    const allTypes = allPokes.map((poke) => {
      return poke.types;
      //me traigo a todos los types q vienen en arreglos si son mas de 1
      // me quedaria => allTypes = [[grass,poison],[fire,electric],[water],[fire]] => ojo! aca se pueden repetir
    });
    const arrayTypes = allTypes.flat();
    // me concatena todos los types q estan anidados en el array
    // arrayTypes = [grass,poison,fire,electric,water,fire]

    const typesSet = [...new Set(arrayTypes)];
    //Me elimina los valores repetidos y me queda => typesSet = [grass,poison,fire,electric,water]
    console.log(typesSet);
    typesSet.forEach((type) => {
      Type.findOrCreate({ where: { name: type } }); //va a buscar en mi tabla types por nombre a ver si encuentra el mismo nombre q le estoy pasando (por ejemplo "grass"), si no lo encuentra, entonces lo crea en mi base de datos! si no esta lo crea y sino no!
      // me sirve para cuando tenga el {force: false}
      // me guarda todas estas types q me vienen de la api en el modelo
    });
    const finalTypes = await Type.findAll();
    //encontra todas las types q haya en mi base de datos y guardalas en la variable
    res.status(200).send(finalTypes);
    // devuelvo todas las types q hay guardadas en mi base de datos
  } catch (error) {
    console.log("error from type route", error);
  }
});

//lo q me pide es q yo ya guarde los distintos "types" q me trae la api en la base de datos para que despues pueda desde el front tener las distintas opciones de types para elegirle a mi pokemon

module.exports = typesRouter;
