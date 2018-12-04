$('document').ready(() =>{
    console.log('yay');
    $('#teste').click( function(e){
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/searching',						
            success: function(data) {
                console.log('success');
            }
        });
    });

    
    $('#standby').click(function(){
        window.location = "/home";
    });

    //========= Home ===========================
    $('#card-home-identifique').click(function(){
        window.location = "/menu";
    });

    $('#btn-home-concluir-cadastro').click(function(){
        window.location = "/concluirCadastro";
    });

    $('#btn-home-instrucoes-do-cadastro').click(function(){
        window.location = "/instrucoesCadastro";
    });

    $('#btn-home-saiba-mais').click(function(){
        window.location = "/saibaMais";
    });

    $('#btn-home-ajuda').click(function(){
        window.location = "/ajuda";
    });


    //========= lockerAberto ===========================
    
    $('#btn-footer-lockerAberto').click(function(){
        window.location = "/home";
    });

     //========= concluirCadastro ===========================
    
     
    $('#btn-concluirCadastro-continuar').click(function(){
        window.location = "/digital";
    });

    $('#btn-concluirCadastro-voltar').click(function(){
        window.location = "/home";
    });


     //========= concluindoCadastro ===========================
    

    $('#btn-concluindoCadastro-voltar').click(function(){
        window.location = "/concluirCadastro";
    });

   

    //========= Menu ===========================
    
    $('#btn-menu-guardar').click(function(){
        window.location = "/guardado";
    });
    
    $('#btn-menu-retirar').click(function(){
        window.location = "/retirado";
    });

    $('#btn-menu-sair').click(function(){
        window.location = "/sair";
    });

    $('#btn-menu-suporte').click(function(){
        window.location = "/suporte";
    });

    
    
    //========= Suporte ===========================
    
    $('#btn-suporte-voltar').click(function(){
        window.location = "/home";
    });

     //========= ajuda ===========================
    
     $('#btn-ajuda-voltar').click(function(){
        window.location = "/home";
    });

      //========= lockerAbertoGuardar ===========================
      $('#btn-footer-guardar').click(function(){
        window.location = "/logoff";
    });


     //========= lockerAbertoGuardado ===========================
     $('#btn-footer-retirar').click(function(){
        window.location = "/logoff";
    });

});
