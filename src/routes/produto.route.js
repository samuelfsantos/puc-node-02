
    const express = require("express");
    const app = express.Router();

    const produtos = require('../controllers/produto.controller.js');

    // Recupera todos os Produtos
    app.get('/produtos', produtos.findAll);

    // Recupera um Produto pelo Id
    app.get('/produtos/:id', produtos.findOne);

    // Cria um novo Produto
    app.post('/produtos', produtos.create);

    // Atualiza um produto pelo Id
    app.put('/produtos/:id', produtos.update);

    // Deleta um produto pelo Id
    app.delete('/produtos/:id', produtos.delete);

    module.exports = app;