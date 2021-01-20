var express = require('express');
const { route } = require('.');
var router = express.Router();

var batismoController = require('../controllers/batismo')

// GET /api/batismos/batisado - Devolve apenas uma lista com os nomes dos indivíduos batizados ordenada alfabeticamente;
router.get('/batismos/batisado', (req,res) => {
    batismoController.listTitle()
        .then(data => {
            var result = []
            data.forEach(d => {
                const aux = d.title.split(':')
                const aux2 = aux[1].split('.')
                const batizado = aux2[0]
                //console.log(batizado.substring(1))
                result.push(batizado.substring(1))
            })
            res.json(result.sort())
        })
        .catch(err => res.status(500).jsonp(err))
})

// GET /api/batismos/stats - Devolve uma lista de pares, ano e número de batismos nesse ano
router.get('/batismos/stats', (req,res) => {
    batismoController.listStats()
            .then(data => res.json(data))
            .catch(err => res.status(500).jsonp(err))
})

// GET /api/batismos/progenitores
router.get('/batismos/progenitores', (req,res) => {
    batismoController.listProgenitores()
            .then(data => res.json(data))
            .catch(err => res.status(500).jsonp(err))
})

// GET /api/batismos/:id - Devolve a informação completa de um batismo;
router.get('/batismos/:id', (req,res) => {
    const id = req.params.id
    batismoController.findId(id)
        .then(data => res.json(data))
        .catch(err => res.status(500).jsonp(err))
})

// GET /api/batismos?ano=YYYY - Devolve a lista de batismos realizados no ano YYYY;
router.get('/batismos', (req,res) => {
    if (Object.keys(req.query).length == 0 ){
        batismoController.list()
            .then(data => res.json(data))
            .catch(err => res.status(500).jsonp(err))
    }
    else{
        batismoController.findByYear(req.query.ano)
                .then(data => res.json(data))
                .catch(err => res.status(500).jsonp(err))
    }
})

module.exports = router;