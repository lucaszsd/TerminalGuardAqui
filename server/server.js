'use strict';

const Promise = require('bluebird');
// custom logger
const log = require('./logger.js');
const express = require('express');
const path = require('path');
const PythonShell = require('python-shell');
const app = express();
var digitalLida = false;


app.use(require('helmet')()); // use helmet
app.use(require('cors')()); // enable CORS
// serves all static files in /public
app.use(express.static(`${__dirname}/../public`));
const port = process.env.PORT || 3000;
const server = require('http').Server(app);

// boilerplate version
const version = `Express-Boilerplate v${require('../package.json').version}`;

// start server
server.listen(port, () => {
  log.info(version);
  log.info(`Listening on port ${port}`);
});

// 'body-parser' middleware for POST
const bodyParser = require('body-parser');
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  res.send(`welcome, ${req.body.username}`);
});

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  // create user in req.body
});





//------------------------

app.get('/home', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/home.html'))
});

//==== Home ========================================================

app.get('/identificado', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/identificado.html'))
});

app.get('/menu', (req, res) =>{
  if(digitalLida == true){
    res.sendFile(path.join(__dirname + '/../public/menu.html'))
  }
  else{
    res.sendFile(path.join(__dirname + '/../public/home.html'))
    digitalLida = false;  
  }
});

app.get('/concluirCadastro', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/concluirCadastro.html'))
});

app.get('/instrucoesCadastro', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/instrucoes.html'))
});

app.get('/saibaMais', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/saibaMais.html'))
});

app.get('/ajuda', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/ajuda.html'))
});

//==== Menu ========================================================

app.get('/guardar', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/lockerAbertoGuardar.html'))
});

app.get('/guardado', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/lockerFechadoGuardar.html'))
});

app.get('/retirar', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/lockerAbertoRetirar.html'))
});

app.get('/retirado', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/lockerFechadoRetirar.html'))

});

app.get('/sair', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/home.html'))
});

app.get('/logoff', (req, res) =>{ 
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5000);
  res.sendFile(path.join(__dirname + '/../public/home.html'))
});


app.get('/suporte', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/suporte.html'))
});

app.get('/digital', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/concluindoCadastro.html'))
});




//-------------------------------

app.post('/buscaDigital', (req, res) =>{
/*
  PythonShell.PythonShell.run(path.join(__dirname + '/../public/scripts/digital.py'), null, function (err, results) {
    if (err) throw err;
    if (results[0][1] > 100){
	  digitalLida = true;
    console.log('Digital reconhecida');
   }
	console.log(results);

  });
*/
});


app.post('/cadastraDigital', (req, res) =>{
  
  PythonShell.PythonShell.run(path.join(__dirname + '/../public/scripts/digital_cadastro.py'), null, function (err, results) {
    if (err) throw err;
    if (results[0][1] > 100){
	    digitalLida = true;
    }
	console.log(results)
  });

});