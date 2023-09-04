const axios = require("axios");
const { Pokemon, Tipo } = require("../db.js");

const info = async (name, id) => {
  const pokesBDD = await Pokemon.findAll({ include: Tipo });
  const result = [];
  pokesBDD.forEach((e) => {
    result.push({
      id: e.id,
      name: e.name,
      image: e.image,
      vida: e.vida,
      fuerza: e.fuerza,
      defensa: e.defensa,
      velocidad: e.velocidad,
      peso: e.peso,
      altura: e.altura,
      createdDBB: e.createdDBB,
      tipos: e.tipos.map((e) => e.name),
    });
  });
  const URL = "https://pokeapi.co/api/v2/pokemon?limit=1500";
  const { data } = await axios.get(URL);
  let pokeArr = [];
  //array de promose
  const urlArray = data.results.map(async (e) => {
    const { data } = await axios.get(e.url);
    return data;
  });
  const promesiArray = await Promise.all(urlArray);
  promesiArray.forEach((e) => {
    pokeArr.push({
      id: e.id,
      name: e.name,
      tipos: e.types.map((e) => e.type.name),
      image: e.sprites.other.home.front_default,
      peso: e.weight,
      altura: e.height,
      vida: e.stats[0].base_stat,
      fuerza: e.stats[1].base_stat,
      defensa: e.stats[2].base_stat,
      velocidad: e.stats[5].base_stat,
      createdDBB: false,
    });
  });
  pokeArr = [...result, ...pokeArr];
  if (name) {
    const findPoke = pokeArr.find((e) => e.name == name);
    return findPoke;
  }
  if (id) {
    const findPoke = pokeArr.find((e) => e.id == id);
    return findPoke;
  }
  return pokeArr;
};

module.exports = {
  info,
};
