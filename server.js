var express = require('express');
var cors = require('cors');
var router = express.Router();
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const nconf = require('nconf');
var app = express();

//eventos do mongodb
var mongoose = require('mongoose');
//global.db = mongoose.connect('mongodb+srv://root:root@cluster0-xehd2.mongodb.net/banco_veiculos?retryWrites=true');
global.db = mongoose.connect('mongodb://carroMongo:carroMongo1@ds133556.mlab.com:33556/carro?retryWrites=true');
mongoose.connection.on('connected', function () {
  console.log('=====Conexão estabelecida com sucesso=====');
});
mongoose.connection.on('error', function (err) {
  console.log('=====Ocorreu um erro: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('=====Conexão finalizada=====');
});

var Schema = mongoose.Schema;
    
var carroSchema = Schema({
    id: { type: Number, required: true },
    ano : { type: Number},
    placa: { type: String},
    cor: { type: String },
    modelo: { type: String},
    longitude: { type: Number},
    latitude: { type: Number},
    status: {type: String}
});

var CarroSchema = mongoose.model("carros", carroSchema);

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
 *       - id
 *       - ano
 *       - placa
 *       - cor
 *       - modelo
 *       - status
 *     properties:
 *       id:
 *         type: Number   
 *       ano:
 *         type: Number
 *       placa:
 *         type: string
 *       cor: 
 *         type: string
 *       modelo:
 *         type: string
 *       status: 
 *         type: string
 */

/**
 * @swagger
 *
 * /veiculo/status/{idCarro}:
 *   get:
 *     tags:
 *       - Veículos
 *     description: Incluir status do veículo 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: idCarro
 *         description: Id do carro que quer saber o status
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: status
 */
app.get('/veiculo/status/:idCarro', function (req, res) {
  
  CarroSchema.findOne({id : req.params.idCarro}, function (erro, carroJaCadastrado) {
    if (carroJaCadastrado) {
        carroJaCadastrado.status
        res.status(200).send({status : carroJaCadastrado.status});
    } else {
      res.send("Carro não encontrado");
    }
});

})

/**
 * @swagger
 *
 * /veiculo/status/{idCarro}:
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
 *       - name: idCarro
 *         description: Id do carro a ser altera
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: status
 *         schema: 
 *           $ref: '#/definitions/Status'
 */
app.put('/veiculo/status/:idCarro', function (req, res) {

  console.log('request', req.body.status);

  CarroSchema.findOne({id : req.params.idCarro}, function (erro, carroJaCadastrado) {
    console.log('carro:' + carroJaCadastrado);
    if (carroJaCadastrado) {
        carroJaCadastrado.status = req.body.status;
        console.log("após aleracao do status" ,carroJaCadastrado);
        var query = {'id' : carroJaCadastrado.id}
        CarroSchema.findOneAndUpdate(query, carroJaCadastrado, {upsert:true}, function(err, doc){
          if (err) return res.send(500, { error: err });
          return res.status(200).send(carroJaCadastrado);
      });
    } else {
      res.send("Carro não encontrado");
    }
});
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
 *         description: Id do carro.
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
  
  CarroSchema.findOne({id : req.params.id}, function (erro, carroJaCadastrado) {
    console.log('carro:' + carroJaCadastrado);
    if (carroJaCadastrado) {
        res.send(carroJaCadastrado);
    } else {
      res.send("Carro não encontrado");
    }
});
})

/**
 * @swagger
 *
 * /veiculo/dados:
 *   post:
 *     tags:
 *       - Veículos
 *     description: Incluir status do veículo 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: carro
 *         description: Objeto carro.
 *         in: body
 *         required: true
 *         type: string
 *         schema: 
 *           $ref: '#/definitions/Carro'
 *     responses:
 *       200:
 *         description: Carro
 *         schema: 
 *           $ref: '#/definitions/Carro'
 */
app.post('/veiculo/dados', function (req, res) {
  var carro = req.body;
  console.log("dados do body: ", req.body);
  if (!carro.id) {
    res.status(400);
    res.send("Id do carro é obrigdat'rio");
  }
  console.log("carros do mongo", CarroSchema);
  CarroSchema.findOne({id : carro.id}, function (erro, carroJaCadastrado) {
        console.log('carro:' + carroJaCadastrado);
        if (carroJaCadastrado) {
            res.send(carroJaCadastrado);
        } else {
          CarroSchema.create(carro, function (erro, carroInserido ) {
                if (erro) {
                    res.send(erro);
                }
                else {
                    res.send(carroInserido);
                }
            });
        }
});
})

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});