'use strict';

const Promise = require('bluebird');
// custom logger
const log = require('./logger.js');
const express = require('express');
const path = require('path');
const app = express();



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
  res.sendFile(path.join(__dirname + '/../public/menu.html'))
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
  res.sendFile(path.join(__dirname + '/../public/instrucoes.html'))
});

//==== Menu ========================================================

app.get('/guardar', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/lockerAberto.html'))
});

app.get('/retirar', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/lockerFechado.html'))
});

app.get('/sair', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/home.html'))
});

app.get('/suporte', (req, res) =>{
  res.sendFile(path.join(__dirname + '/../public/suporte.html'))
});

function teste() { 
  var myPythonScriptPath = path.join(__dirname + '/../public/scripts/script.py');

  // Use python shell
  var {PythonShell} = require('python-shell');
  var pyshell = new PythonShell(myPythonScriptPath);

  pyshell.on('message', function (message) {
      // received a message sent from the Python script (a simple "print" statement)
      console.log(message);
  });

  // end the input stream and allow the process to exit
  pyshell.end(function (err) {
      if (err){
          throw err;
      };

      console.log('finished');
  });

} 

teste();



//-------------------------------

app.post('/digital', (req, res) =>{
  console.log("Chamou a rota no node");
  console.log(path.join(__dirname + '/../public/scripts/digital_cadastro.py'));
  

  const { spawn } = require('child_process');
  const ls = spawn(path.join(__dirname + '/../public/scripts/hello.py'), ['hello', 'world']);
  
  

  console.log("Chamou o script python");

});




//--------------------


// ex. using 'node-fetch' to call JSON REST API
/*
const fetch = require('node-fetch');
// for all options see https://github.com/bitinn/node-fetch#options
const url = 'https://api.github.com/users/cktang88/repos';
const options = {
  method: 'GET',
  headers: {
    // spoof user-agent
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'
  }
};

fetch(url, options)
  .then(res => {
    // meta
    console.log(res.ok);
    console.log(res.status);
    console.log(res.statusText);
    console.log(res.headers.raw());
    console.log(res.headers.get('content-type'));
    return res.json();
  })
  .then(json => {
    console.log(`User has ${json.length} repos`);
  })
  .catch(err => {
    // API call failed...
    log.error(err);
  });
*/
