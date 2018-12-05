$('document').ready(() =>{
   
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/buscaDigital',						
        success: function(data) {
        console.log('success');
        }
    });

    console.log('leitura digital');
    
});
