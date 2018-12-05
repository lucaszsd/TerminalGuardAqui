$('document').ready(() =>{
   
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/cadastraDigital',						
        success: function(data) {
        console.log('success');
        }
    });

    console.log('leitura de digital');
    
});