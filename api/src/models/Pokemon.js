const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "pokemon",
    {
      id: {
        type: DataTypes.UUID, //para q me genere un numero random con letras y numeros q no se va a repetir es unico, y pasa a ser un id distinto a los q me va a traer la api, que tambien son pokemones con id de numeros enteros!!
        defaultValue: DataTypes.UUIDV4, //valor por defecto
        allowNull: false, //si esta seteado en false > este campo es requerido
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      hp: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 150 }, //entre 1 y 150 va a ir ese numero
      },
      attack: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 150 },
      },
      defense: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 150 },
      },
      speed: {
        type: DataTypes.INTEGER,
      },
      height: {
        type: DataTypes.INTEGER,
      },
      weight: {
        type: DataTypes.INTEGER,
      },
      createdInDb: {
        //por si quiero hacer una llamada solo a lo que esta en mi base de datos
        //me sirve para cuando quiero hacer la distincion entre los q me vienen de la api y los q cree desde aca, saber q este campo lo voy a tener creado solo aca en mi tabla de mi BD
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        //todos lo que yo cree, se van a crear con esta propiedad!!
      },
    },
    {
      timestamps: false,
    }
  );
};
