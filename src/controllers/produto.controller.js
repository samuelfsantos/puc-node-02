let Knex = require('../models/produto.model.js');


// Recupera todos os Produtos da lista
exports.findAll = (req, res) => {
    Knex.select('*').from('produtos')
    .then (produtos => res.status(200).json(produtos))
    .catch (err => res.status(500).json ({ message: `Erro ao recuperar produtos: ${err.message}` }))
};


// Encontra um produto pelo Id
exports.findOne = (req, res) => {
    Knex.select().from('produtos').where('id', Number(req.params.id)).first()
    .then (produto => {
        if(!produto) {
            res.status(400).json({ message: `Produto não encontrado com id: ${req.params.id}` })
        }
        else{
            res.status(200).json(produto)
        }
    })
    .catch (err => res.status(500).json ({ message: `Erro ao recuperar produto: ${err.message}` }))
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
    const produtoReq = {
        descricao: req.body.descricao,
        valor: req.body.valor,
        marca: req.body.marca
    };

    Knex('produtos').insert(produtoReq, ['id'])
        .then (produto => {
        let id = produto[0].id
        res.json({ message: `Produto inserido com sucesso. Id:`, id  })
    })
    .catch (err => res.json ({ message: `Erro ao inserir produto: ${err.message}` }))
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

    knex.select().from('produtos').where('id', Number(req.params.id)).first()
    .then (produtoReq => {
        if(!produtoReq) {
            // Validando se o produto existe
            res.status(400).json({ message: `Produto não encontrado com id: ${req.params.id}` })
        }
        else{
            //Atualizando o produto
            produtoReq.descricao = req.body.descricao;
            produtoReq.valor = req.body.valor;
            produtoReq.marca = req.body.marca;
            knex('produtos').update(produtoReq)
                .then (produto => {
                res.json({ message: `Produto ${produto.id} atualizado com sucesso.`  })
            })
            .catch (err => res.json ({ message: `Erro ao atualizar produto: ${err.message}` }))
        }
    })
    .catch (err => res.status(500).json ({ message: `Erro ao recuperar produto: ${err.message}` }))
};


// Exclui um produto identificado pelo id
exports.delete = (req, res) => {
    knex.select().from('produtos').where('id', Number(req.params.id)).first()
    .then (produtoReq => {
        if(!produtoReq) {
            // Validando se o produto existe
            res.status(400).json({ message: `Produto não encontrado com id: ${req.params.id}` })
        }
        else{
            //Excluindo o produto
            knex('produtos').delete(produtoReq)
                .then (produto => {
                res.json({ message: `Produto ${produto.id} excluído com sucesso.`  })
            })
            .catch (err => res.json ({ message: `Erro ao excluir produto: ${err.message}` }))
        }
    })
    .catch (err => res.status(500).json ({ message: `Erro ao recuperar produto: ${err.message}` }))
};