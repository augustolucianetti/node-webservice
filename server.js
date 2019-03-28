var express = require('express');
var cors = require('cors');
var router = express.Router();
const bodyParser = require('body-parser');
var app = express();
app.use(cors());

app.use(express.static('./public'));
//app.use(bodyParser());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8000;

app.get('/veiculo/status', function (req, res) {
  res.json({status : 'livre'});
})

app.post('/veiculo/status', function (req, res) {
  console.log('request', req.body.status);
  res.send(req.body);
})

app.put('/veiculo/status', function (req, res) {
  console.log('request do put', req.body.status);
  res.send(req.body);
})

app.get('/erro', function(req, res) {
  res.status(404).send("Um erro aconteceu!");
});

app.get('/veiculo/dados', function (req, res) {
  let carro = {
    ano : 2019,
    placa : "BPM-1234",
    cor : "preto",
    nome_dono : "Percival Rocha",
    status : "livre"
  }
  res.send(carro);
})

app.post('/veiculo/corrida', function (req, res) {
  let carro = {
    ano : 2019,
    placa : "BPM-1234",
    cor : "preto",
    nome_dono : "Percival Rocha",
    status : "livre"
  }

  let passageiro = {
    nome : "Percival Leme",
    cpf : "12345678900",
    idade : 26,
    sexo : "Masculino"
  }

  let corrida = {
    carro : carro,
    passageiro : passageiro,
    origem : {
      endereco : "rua Sampaio Vidal",
      numero : 100,
      bairro : "Moooca",
      cidade : "São Paulo",
      estado : "SP"
    },
    destino : {
      endereco : "Alameda Bertioga",
      numero : 310,
      bairro : "Alphaville",
      cidade : "Santana de Parnaíba",
      estado : "SP"
    },
    status : "ïniciada",
    id : 1
  }
  res.send(corrida);
})

app.delete('/veiculo/corrida/:id', function (req, res) {
  let carro = {
    ano : 2019,
    placa : "BPM-1234",
    cor : "preto",
    nome_dono : "Percival Rocha",
    status : "livre"
  }

  let passageiro = {
    nome : "Percival Leme",
    cpf : "12345678900",
    idade : 26,
    sexo : "Masculino"
  }

  let corrida = {
    carro : carro,
    passageiro : passageiro,
    origem : {
      endereco : "rua Sampaio Vidal",
      numero : 100,
      bairro : "Moooca",
      cidade : "São Paulo",
      estado : "SP"
    },
    destino : {
      endereco : "Alameda Bertioga",
      numero : 310,
      bairro : "Alphaville",
      cidade : "Santana de Parnaíba",
      estado : "SP"
    },
    status : "ïniciada",
    id : req.params.id
  }
  res.send(corrida);
})

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});