var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var flag = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var lockerAberto = false;
var botao = new Gpio(18, 'in');

const sensor_trava = function(){ //funcao de travamento/destravamento

  //process.send('iniciou');
  tranca();
  lockerAberto = false;
  
  let counter = 0;

  setInterval(() => {
    process.send({ counter: counter++ });
  }, 1000);
  
  process.send({ foo: 'Porta Fechada'});
  while (botao.readSync() == 0){
    lockerAberto = false;
  }
  
  process.send({ foo: 'Porta Aberta'});
  while (botao.readSync() == 1){  
    destranca();
    lockerAberto = true;
  }  
  console.log('Terminou');
  process.send({ foo: 'Terminou'});
}

const tranca = function(){ 
  flag.writeSync(1); 
}

const destranca = function(){ 
  flag.writeSync(0); 
}  

sensor_trava();
