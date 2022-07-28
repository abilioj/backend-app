const config = require('../knexfile.js')
const knex = require('knex')(config)

//Cria A migração, adiciona as TABLE no banco automaticamente
// knex.migrate.latest([config])

//remove as TABLE no banco
// knex.migrate.rollback([config])

module.exports = knex