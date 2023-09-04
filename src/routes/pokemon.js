const { Router } = require("express");
const {
  getPokemonById,
  getPokemons,
  createPokemons,
} = require("../controllers/pokemon.controllers");

const router = Router();

router.get("/", getPokemons);
router.post("/", createPokemons);
router.get("/:id", getPokemonById);


module.exports = router;
