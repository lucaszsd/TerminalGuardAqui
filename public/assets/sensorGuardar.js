$('document').ready(() =>{
   
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/sensorGuardar',						
        success: function(data) {
            console.log('success');
            window.location.replace(data.url);
        }
    });

    console.log('ajax sensorGuardar');
    
});
