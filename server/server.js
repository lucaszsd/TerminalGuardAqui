'use strict';

const Promise = require('bluebird');
// custom logger
const log = require('./logger.js');
const express = require('express');
const path = require('path');
const PythonShell = require('python-shell');
const app = express();
var digitalLida = true; //alterar aqui para evitar ir ao menu sem digital
const { fork } = require('child_process');




app.use(require('helmet')()); // use helmet
app.use(require('cors')()); // enable CORS
// serves all static files in /public
app.use(express.static(`${__dirname}/../public`));
const port = process.env.PORT || 3000;
const server = require('http').Server(app);


var Gpio = require('onoff').Gpio; 
var flag = new Gpio(4, 'out'); //GPIO saida pro relé
var botao = new Gpio(18, 'in');
var lockerAberto = false;


// boilerplate version
const version = `Express-Boilerplate v${require('../package.json').version}`;

// start server
server.listen(port, () => {
  log.info(version);
  log.info(`Listening on port ${port}`);
  //tranca();
  lockerAberto = false;
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
  /*const forked = fork('botao.js');
	forked.on('message', (msg) => {
    
    if (msg.foo == 1){
        lockerAberto = true;
        console.log('Aberta');
    }
    else if(msg.foo == 2){
      lockerAberto = false;
      console.log('Fechada')
      
    }
    else if(msg.foo == 3){
      console.log('Terminada')
      return res.status(200).send({result: 'redirect', url:'/guardado'})
      
    }
    else{
      console.log('teste de quarda opção - [DESCARTAVEL]')
    }  
  });
  
  forked.on('close', (code, signal) => {
    //console.log( `child process terminated due to receipt of signal ${signal}`);
  });*/
  
  
});

app.get('/sensor', (req, res) =>{
  console.log('chegou em sensor')
  sensor_trava();
  console.log('terminou sensor trava')
  return res.status(200).send({result: 'redirect', url: '/guardado'})
});


app.get('/guardado', (req, res) =>{
  console.log('Redirecionou pra guardado') 
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

app.get('/buscaDigital', (req, res) =>{
  
  console.log('redirecionado pra buscaDigital')
  PythonShell.PythonShell.run(path.join(__dirname + '/../public/scripts/digital.py'), null, function (err, results) {
    console.log('Aguardando digital')
    console.log(results);

    if (results == undefined){
      console.log('deu undefined');
      return res.redirect('/buscaDigital')
    }
    else if (results[0] == -2){
      console.log('leitor nao iniciado');
      return res.redirect('/buscaDigital')
    }
    else if (results[0] == -1){
      console.log('nao cadastrada')
      console.log('redirecionando pra cadastro')
      return res.status(200).send({result: 'redirect', url:'/concluirCadastro'})
      //return res.redirect('/concluirCadastro')   
    }
    else if (results[1] > 100){
      digitalLida = true;
      //console.log(digitalLida);
      console.log('Digital reconhecida');
      console.log('redirecionando pra menu')
      return res.status(200).send({result: 'redirect', url:'/menu'})
      //return res.redirect('/menu') 
    }
    else{
      console.log('digital nao tem acuracia');
      console.log('redirecionando pra buscaDigital')
      return res.redirect('/buscaDigital')
    }
  });

});


app.get('/cadastraDigital', (req, res) =>{
  
  console.log('redirecionado pra cadastraDigital')

  PythonShell.PythonShell.run(path.join(__dirname + '/../public/scripts/digital_cadastro.py'), null, function (err, results) {
    if (results == undefined){
        console.log('deu undefined');
        res.redirect('/cadastraDigital')
    }
    else if (results[0][1] > 100){
	    digitalLida = true;
    }
    else{
        console.log('redirecionando pra cadastraDigital')
        res.redirect('/cadastraDigital')
    }
  });
});

const sensor_trava = function(){ //funcao de travamento/destravamento

  tranca();
  console.log('trancado')
  
  while (botao.readSync() == 0){ //botao desativado
  }
  
  destranca();
  console.log('destrancado')

  while(botao.readSync() == 1){ //botao ativado
  }
  
  tranca();
  console.log('trancado')
  lockerAberto = false;
  
  //location.href = (path.join(__dirname + '/../public/lockerFechadoGuardar.html'))
}

const tranca = function(){ //function to start blinking

  flag.writeSync(1); 
}

const destranca = function(){ //function to start blinking
  console.log('destrancado')
  flag.writeSync(0); 
}  

