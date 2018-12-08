$('document').ready(() =>{
   
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/sensorRetirar',						
        success: function(data) {
            console.log('success');
            window.location.replace(data.url);
        }
    });

    console.log('ajax sensorRetirar');
    
});
