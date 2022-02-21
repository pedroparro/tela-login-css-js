$(function (){
    //remover a acao do botao
    $("button#btnEntrar").on("click", function(e){
        e.preventDefault();
        //pegar campos do formulário pelo ID
        var campoEmail = $("form#formularioLogin #email").val();
        var campoSenha = $("form#formularioLogin #senha").val();

        //verifica se os campos estao corretos
        //trim() retira os espaços em branco ao preencher o formulario
        //show() transforma display da div em block na mensagem
        //addClass("red") cor da mensagem de erro
        //removeClass("red") alerta para preencher tudo
        if(campoEmail.trim() == "" || campoSenha.trim() == ""){
            $("div#mensagem").show().addClass("red").html("Preencha todos os campos");
        }else{
            //Enviar Requisicao AJAX Metodo, Ação e Parametros do formulario
            //definir os campos do formulario
            $.ajax({
                //Action do formulario
                //sera executado da index
                url: "login.php",
                //Metodo do formulario
                type: "POST",
                //Parametros
                data: {
                    type: "login",
                    email: campoEmail,
                    senha: campoSenha
                },

                success: function(retorno){
                    retorno = JSON.parse(retorno);
                    //erro 1 da pagina LOGIN JSON
                    if(retorno["erro"] == 1){
                        $("div#mensagem").show().addClass("red").html(retorno["mensagem"]);
                    }else{
                        window.location = "dashboard.php";
                    }
                },
                //Erro
                error: function(){
                    $("div#mensagem").show().addClass("red").html("Ocorreu erro na solicitação");
                }
            });
        }      
    });
     
    ///////////////////////////////////////////////////////////////////////////////////////////////
      //Classe change toggle
     //trocando as DIV display 
    $("button.change").on("click", function() {
        $("div#formulario").toggleClass("cadastro");

        $("form#formularioLogin").toggle();
        $("form#formularioCadastro").toggle();

        $("div#textoCadastro").toggle();
        $("div#textologin").toggle();
    });
    
});
