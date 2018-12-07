$('#gambi').ready(() =>{
   
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/guardado',						
        success: function(data) {
        console.log('success');
        }
    });

    console.log('gambiarra do carai');
    
});
