const { Router } = require("express");
const {getTypes} = require('../controllers/types.controllers')

const router = Router();

router.get("/", getTypes );

module.exports = router;
