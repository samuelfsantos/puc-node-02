let Produtos = require('../models/produto.model.js');


// Recupera todos os Produtos da lista
exports.findAll = (req, res) => {
    res.json(Produtos)
};


// Encontra um produto pelo Id
exports.findOne = (req, res) => {
    let produto = Produtos.find(x => Number(x.id) === Number(req.params.id));
    if(!produto) {
        return res.status(400).send({
            message: "Produto não encontrado com id " + req.params.id
        });
    }
    res.json(produto);
};


// Cria e Salva novo Produto na lista
exports.create = (req, res) => {
    // Validando a requisição
    if(!req.body.descricao) {
        return res.status(400).send({
            message: "A 'descrição' do produto não pode estar vazia!"
        });
    }
    if(!req.body.valor) {
        return res.status(400).send({
            message: "O 'valor' do produto não pode estar vazio!"
        });
    }
    if(!req.body.marca) {
        return res.status(400).send({
            message: "A 'marca' do produto não pode estar vazia!"
        });
    }
    // Cria um novo Produto
    const ultimoId = Produtos.reduce(
        (max, prod) => (prod.id > max ? prod.id : max), Produtos[0].id
      );
    const produto = {
        id: ultimoId + 1,
        descricao: req.body.descricao,
        valor: req.body.valor,
        marca: req.body.marca
    };
    // Salva o produto na lista
    Produtos.push(produto);
    // Retorna msg de sucesso
    return res.send({
        message: "Produto criado com sucesso!"
    });
};


// Atualiza um produto identificado pelo id
exports.update = (req, res) => {
    // Validando a requisição
    if(!req.body.descricao) {
        return res.status(400).send({
            message: "A 'descrição' do produto não pode estar vazia!"
        });
    }
    if(!req.body.valor) {
        return res.status(400).send({
            message: "O 'valor' do produto não pode estar vazio!"
        });
    }
    if(!req.body.marca) {
        return res.status(400).send({
            message: "A 'marca' do produto não pode estar vazia!"
        });
    }
    // Validando se o produto existe
    let produto = Produtos.find(x => Number(x.id) === Number(req.params.id));
    if(!produto) {
        return res.status(400).send({
            message: "Produto não encontrado com id " + req.params.id
        });
    }
    //Atualizando as propriedades do produto
    let indice = Produtos.findIndex(x => Number(x.id) === Number(req.params.id));
    produto.descricao = req.body.descricao;
    produto.valor = req.body.valor;
    produto.marca = req.body.marca;
    Produtos[indice] = produto;
    // Retorna msg de sucesso
    return res.send({
        message: "Produto atualizado com sucesso!"
    });
};


// Exclui um produto identificado pelo id
exports.delete = (req, res) => {
    // Validando se o produto existe
    let produto = Produtos.find(x => Number(x.id) === Number(req.params.id));
    if(!produto) {
        return res.status(400).send({
            message: "Produto não encontrado com id " + req.params.id
        });
    }
    // Exclusão do produto pelo id
    let indice = Produtos.findIndex(x => Number(x.id) === Number(req.params.id));
    Produtos.splice(indice, 1);
    // Retorna msg de sucesso
    return res.send({
        message: "Produto excluído com sucesso!"
    });
};