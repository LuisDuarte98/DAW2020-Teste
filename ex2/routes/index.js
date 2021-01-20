var express = require('express');
var router = express.Router();
var axios = require('axios');


var token = ""

// Obter token no arranque da aplicação ==> Pode conter algum delay =(
axios.post('http://clav-api.di.uminho.pt/v2//users/login',{username: "pri2020@teste.uminho.pt", password: "123"})
    .then((res) => {
        console.log('Obtive com sucesso',res.data.token);
        token = res.data.token;
    })
    .catch((err) => {
        console.log(err);
    });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET classses. */
router.get('/classes', function(req, res, next) {
    axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&token=' + token)
        .then(result => {
            res.render('index', { classes: result.data })
        })
        .catch(error => {
            res.render('error', { error: error })
        });
});

/* GET termos de indices. */
router.get('/termos', function(req, res, next) {
    axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
        .then(result => {
            res.render('termos', { termos: result.data })
        })
        .catch(error => {
            res.render('error', { error: error })
        });
});

module.exports = router;
