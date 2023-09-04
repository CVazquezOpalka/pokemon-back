const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemon = require("./pokemon.js");
const type = require("./type.js");

const router = Router();

router.use("/pokemons", pokemon);
router.use("/types", type);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
