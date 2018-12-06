var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var flag = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
var lockerAberto = false;
var botao = new Gpio(18, 'in');

const sensor_trava = function(){ //funcao de travamento/destravamento
  while(true){
    
    console.log('iniciou')
    tranca();
    lockerAberto = false;
    
    while (botao.readSync() == 0){
	  
	  console.log('desativado')
	  lockerAberto = false;
    }
    
    while (botao.readSync() == 1){
	    
	  console.log('ativado')
	  destranca();
	  lockerAberto = true;
    }  
	  
    }
}

const tranca = function(){ //function to start blinking

  flag.writeSync(1); 
 
}

const destranca = function(){ //function to start blinking

  flag.writeSync(0); 
  //Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 5000);

}  

sensor_trava();
