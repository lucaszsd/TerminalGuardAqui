$('document').ready(() =>{
   
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/sensor',						
        success: function(data) {
            console.log('success');
            window.location.replace(data.url);
        }
    });

    console.log('sensor chamar do ajax');
    
});
