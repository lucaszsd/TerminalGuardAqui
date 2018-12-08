var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var flag = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var lockerAberto = false;
var botao = new Gpio(18, 'in');

const sensor_trava = function(){ //funcao de travamento/destravamento

  tranca();
  lockerAberto = false;
  
  while (botao.readSync() == 0){
  }
  
  destranca();

  while (botao.readSync() == 1){   
  }  

  tranca();

}

const tranca = function(){ 
  flag.writeSync(1); 
}

const destranca = function(){ 
  flag.writeSync(0); 
}  

sensor_trava();