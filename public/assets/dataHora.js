
function atualizarDataHora(){
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth();
    var ano = dataAtual.getYear();
    var hora = dataAtual.getHours();
    var minuto = dataAtual.getMinutes();
 
    var horaImprimivel = hora + ":" + minuto;
    //mostrarDataHora(horaImprimivel, diaSemana, dia, mes, ano);
    //setTimeOut("atualizarDataHora()", 1000);

    if (minuto <10){

        minuto = "0" + minuto;
    }     
    retorno = ''+hora+'h'+minuto+'<br>'+dia+'/'+mes+'/'+(ano + 1900);
    document.getElementsByClassName('dataHora')[0].innerHTML = retorno;
}



atualizarDataHora();