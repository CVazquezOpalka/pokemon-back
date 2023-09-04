const axios = require('axios');
const {Tipo} = require('../db')

const getTypes = async (req, res)=>{
    const {data} = await axios.get('https://pokeapi.co/api/v2/type');
    for( t of data.results ) {
        const existe = await Tipo.findOne({where: { name: t.name }})
        if(existe) return res.json(await Tipo.findAll())
        await Tipo.create({ name: t.name})
    }
    res.json(await Tipo.findAll());
}

module.exports= {
    getTypes
}