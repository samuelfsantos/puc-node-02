

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: './src/models/dev.sqlite3'
    }
 })

module.exports = knex;