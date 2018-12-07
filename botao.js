var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var flag = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var lockerAberto = false;
var botao = new Gpio(18, 'in');

const sensor_trava = function(){ //funcao de travamento/destravamento
/*
	let counter = 0;

setInterval(() => {
  process.send({ counter: counter++ });
}, 1000);
*/

  //process.send('iniciou');
  tranca();
  lockerAberto = false;
  
  process.send({ foo : 1});
  while (botao.readSync() == 0){
    //lockerAberto = false;
  }
  
  process.send({ foo : 2});
  while (botao.readSync() == 1){  
    destranca();
    //lockerAberto = true;
  }  

  process.send({ foo : 3});
}

const tranca = function(){ 
  flag.writeSync(1); 
}

const destranca = function(){ 
  flag.writeSync(0); 
}  

sensor_trava();
