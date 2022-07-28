// bodyParser - Analise os corpos de solicitação de entrada em um middleware antes de seus manipuladores
const bodyParser = require('body-parser')
const cors = require('cors')

// Padrao de exporta globamente com ajuda do uso lib consign
module.exports = app => {
    // parse application/json - trata a resposta pra json
    app.use(bodyParser.json())
    // pra trata protecao da requisao entre dominio
    app.use(cors())
}