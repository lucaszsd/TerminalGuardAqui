$('document').ready(() =>{
   
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/sensor',						
        success: function(data) {
        console.log('success');
        }
    });

    console.log('sensor chamar do ajax');
    
});
