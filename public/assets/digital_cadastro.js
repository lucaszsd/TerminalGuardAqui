$('document').ready(() =>{
    console.log('digital ok');


    $('#card-home-identifique').click( function(e){
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/cadastraDigital',						
            success: function(data) {
                console.log('success');
            }
        });
    });

    
});
