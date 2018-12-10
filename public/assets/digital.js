$('document').ready(() =>{
   

      $.ajax({
           type: 'GET',
            url: 'http://localhost:3000/buscaDigital',						      
            success: function(data) {
            	console.log('sucess')
                window.location.replace(data.url);
            }
        });
  

    console.log('leitura digital');
    
});

//if (data.result == 'redirect'){
//  console.log('redirecionado')
                   
//}