$('document').ready(() =>{
   

      $.ajax({
           type: 'GET',
            url: 'http://localhost:3000/buscaDigital',						      
            success: function(data) {
                console.log('terminou')
                if (data.result == 'redirect'){
                    console.log('redirecionado')
                    window.location.replace(data.url);
                }
            }
        });
  

    console.log('leitura digital');
    
});
