$('document').ready(() =>{
   
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/cadastraDigital',						
        success: function(data) {
        console.log('success');
        }
    });

    console.log('leitura de digital');
    
});
