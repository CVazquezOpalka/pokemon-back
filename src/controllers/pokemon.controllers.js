const { info } = require("../middleware/index.js");
const { Pokemon, Tipo } = require("../db.js");

const getPokemons = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const result = await info(name, null);
      if (!result) {
        return res.status(404).json({
          message: `El pokemon con el nombre: "${name}", no se encuentra en la base de datos`,
        });
      } else return res.status(200).json(result);
    }
    const pokemons = await info();
    res.status(200).json(pokemons);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    //sacar este error
    const data = await info(null, id);
    if (!data) {
      return res.status(400).send({
        message: `El pokemon con el id ${id} no se encuentra en la base de datos`,
      });
    } else res.status(200).json(data);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createPokemons = async (req, res) => {
  let { name, image, vida, fuerza, defensa, velocidad, altura, peso, tipos } =
    req.body;

  try {
    const pokeArr = await info();
    const maxId = Math.max(...pokeArr.map((e) => e.id));
    const id = maxId + 1;
    const findPoke = await Pokemon.findOne({ where: { name } });
    if (!name) {
      return res
        .status(400)
        .send({ message: "El parametro name es requerido" });
    }
    if (findPoke) {
      return res.status(400).send({
        message: `El pokemon con el nombre ${name}, ya se encuentra en la base de datos`,
      });
    }
    if (
      isNaN(vida) ||
      isNaN(fuerza) ||
      isNaN(defensa) ||
      isNaN(velocidad) ||
      isNaN(altura) ||
      isNaN(peso)
    ) {
      return res
        .status(400)
        .send({ message: "Alguno de los argumentos no es un numero" });
    }
    const alterImage =
      image ||
      "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_640.png";
    const newPokemon = await Pokemon.create({
      id,
      name: name.toLowerCase(),
      image: alterImage,
      vida: Number(vida),
      fuerza: Number(fuerza),
      defensa: Number(defensa),
      velocidad: Number(velocidad),
      altura: Number(altura),
      peso: Number(peso),
      createdDBB: true,
    });
    if (!tipos.length) tipos = [1];
    await newPokemon.setTipos(tipos);
    res.status(200).json(newPokemon);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getPokemonById,
  getPokemons,
  createPokemons,
};
