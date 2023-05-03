const express = require('express');
const cors = require('cors');
const helmet = require ('helmet');

const server = express();

server.use(cors());
server.use (helmet());
// versionamento
const v1 = require('./src/routes/produto.route.js');
server.use('/api/v1/', v1);

server.use (function (req, res) {
    res.status(404).send('Recurso não encontrado.')
  })
server.listen(3001, () => {
    console.log('Servidor está funcionando..')
});