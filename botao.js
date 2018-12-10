var Gpio = require('onoff').Gpio; 
var flag = new Gpio(4, 'out'); //GPIO saida pro relé
var botao = new Gpio(23, 'in');
var lockerAberto = false;

const sensor_trava = function(){ //funcao de travamento/destravamento

  tranca();
  console.log('trancado')
  
  while (botao.readSync() == 0){ //botao desativado
  console.log('Desativado')
	}
  
  destranca();
  console.log('destrancado')
  
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 4000);
  console.log('esperando botao de novo')

  while(botao.readSync() == 0){ //botao desativado
  }
  
  tranca();
  console.log('trancado')
  lockerAberto = false;
  
}

const tranca = function(){ //function to start blinking

  flag.writeSync(1); 
}

const destranca = function(){ //function to start blinking
  console.log('destrancado')
  flag.writeSync(0); 
}  

sensor_trava();