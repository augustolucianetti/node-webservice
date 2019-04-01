var express = require('express');
var cors = require('cors');
var router = express.Router();
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const nconf = require('nconf');
var app = express();
app.use(cors());

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8000;
const host = nconf.get('app_host'); 
//definindo as rotas
const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'API de veículos',
      version: '1.0.0',
      description: 'API em Express para controle de veículos', 
    host: `${host}:${port}`,  
    basePath: '/',  
    produces: ['application/json'],  
    schemes: [  
      'http',  
    ],
  }
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['server.js'],
};

const specs = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

 /**
 * @swagger
 *
 * definitions:
 *   Status:
 *     type: object
 *     required:
 *       - status
 *     properties:
 *       status:
 *         type: string
 */

 /**
 * @swagger
 *
 * definitions:
 *   Carro:
 *     type: object
 *     required:
 *       - ano
 *       - placa
 *       - cor
 *       - nome_dono
 *       - status
 *     properties:
 *       ano:
 *         type: Number
 *       placa:
 *         type: string
 *       cor: 
 *         type: string
 *       nome_dono:
 *         type: string
 *       status: 
 *           $ref: '#/definitions/Status'
 */

/**
 * @swagger
 *
 * definitions:
 *   Passageiro:
 *     type: object
 *     required:
 *       - nome
 *       - cpf
 *     properties:
 *       nome:
 *         type: string
 *       cpf:
 *         type: string
 *       idade: 
 *         type: Number
 *       sexo:
 *         type: string
 */

 /**
 * @swagger
 *
 * definitions:
 *   Endereco:
 *     type: object
 *     required:
 *       - endereco
 *       - numero
 *       - bairro
 *       - cidade
 *       - estado
 *     properties:
 *       endereco:
 *         type: string
 *       numero:
 *         type: Number
 *       cidade: 
 *         type: string
 *       estado:
 *         type: string
 */

 /**
 * @swagger
 *
 * definitions:
 *   Corrida:
 *     type: object
 *     required:
 *       - carro
 *       - passageiro
 *       - origem
 *       - destino
 *     properties:
 *       carro:
 *           $ref: '#/definitions/Carro'
 *       Passageiro:
 *         $ref: '#/definitions/Passageiro'
 *       origem: 
 *         $ref: '#/definitions/Endereco'
 *       destino:
 *         $ref: '#/definitions/Endereco'
 */

/**
 * @swagger
 *
 * /veiculo/status/{id}:
 *   get:
 *     tags:
 *       - Veículos
 *     description: Buscar status do veículo 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id do carro a ser buscado.
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: status
 */
app.get('/veiculo/status/:id', function (req, res) {
  res.json({status : 'livre', id: req.params.id});
})

/**
 * @swagger
 *
 * /veiculo/status/{id}:
 *   post:
 *     tags:
 *       - Veículos
 *     description: Incluir status do veículo 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: status
 *         description: Status a ser passado para o veículo.
 *         in: body
 *         required: true
 *         type: string
 *         schema: 
 *           $ref: '#/definitions/Status'
 *       - name: id
 *         description: Id do carro a ser buscado.
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: status
 *         schema: 
 *           $ref: '#/definitions/Status'
 */
app.post('/veiculo/status/:id', function (req, res) {
  console.log('request', req.body.status);
  res.send(req.body);
})

/**
 * @swagger
 *
 * /veiculo/status/{id}:
 *   put:
 *     tags:
 *       - Veículos
 *     description: Incluir status do veículo 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: status
 *         description: Status a ser passado para o veículo.
 *         in: body
 *         required: true
 *         type: string
 *         schema: 
 *           $ref: '#/definitions/Status'
 *       - name: id
 *         description: Id do carro a ser buscado.
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: status
 *         schema: 
 *           $ref: '#/definitions/Status'
 */
app.put('/veiculo/status/:id', function (req, res) {
  console.log('request do put', req.body.status);
  res.send(req.body);
})

app.get('/erro', function(req, res) {
  res.status(404).send("Um erro aconteceu!");
});

/**
 * @swagger
 *
 * /veiculo/dados/{id}:
 *   get:
 *     tags:
 *       - Veículos
 *     description: Incluir status do veículo 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id do carro a ser buscado.
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Carro
 *         schema: 
 *           $ref: '#/definitions/Carro'
 */
app.get('/veiculo/dados/:id', function (req, res) {
  let carro = {
    ano : 2019,
    placa : "BPM-1234",
    cor : "preto",
    nome_dono : "Percival Rocha",
    status : "livre",
    id : req.params.id
  }
  res.send(carro);
})

/**
 * @swagger
 *
 * /veiculo/{idVeiculo}/corrida:
 *   post:
 *     tags:
 *       - Veículos
 *     description: Iniciar corrida 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idVeiculo
 *         description: Id do veículo que irá fazer a corrida.
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Corrida
 *         schema: 
 *           $ref: '#/definitions/Corrida'
 */
app.post('/veiculo/:idVeiculo/corrida', function (req, res) {
  let carro = {
    ano : 2019,
    placa : "BPM-1234",
    cor : "preto",
    nome_dono : "Percival Rocha",
    status : "livre",
    id : req.params.idVeiculo
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

/**
 * @swagger
 *
 * /veiculo/corrida/{id}:
 *   put:
 *     tags:
 *       - Veículos
 *     description: Finalizar corrida 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Id da corrida a ser finalizada.
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Corrida
 *         schema: 
 *           $ref: '#/definitions/Corrida'
 */
app.put('/veiculo/corrida/:id', function (req, res) {
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
      estado : "SP",
      id : req.params.id
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