$('document').ready(() =>{
   
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/cadastraDigital',						
        success: function(data) {
        	console.log('sucess')
            window.location.replace(data.url);
        }
    });

    console.log('cadastro de digital');
    
});
