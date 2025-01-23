const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()
const PORT = 3000;

app.use(cors())

app.get(`/:id`, async (req, res) => {
    const character = req.params.id
    console.log(character)
    const url = `https://rickandmortyapi.com/api/character/${character}`

    try {
        const response = await axios.get(url)
        const { name, status, species, gender, origin, image } = response.data 

        res.json({ name, status, species, gender, origin, image })
    } catch (ERROR) {
        res.status(404).json({error: 'Personaje no encontrado'})
    }
})

app.listen(PORT, (req, res) => {
    console.log(`Express listening in port  http://localhost:${PORT}`)
})