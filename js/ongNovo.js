document.addEventListener("DOMContentLoaded", () =>  {
    validaSessao();

    // Inicializar validador de CNPJ
    adicionarValidacaoCNPJ('ong-cnpj');

    // Capturar e popular o campo hidden com o usuario_id da URL
    const url = new URLSearchParams(window.location.search);
    const usuarioId = url.get("usuario_id");

    if(usuarioId){
        document.getElementById("usuario_id").value = usuarioId;
        console.log("Usuario ID capturado:", usuarioId); // Debug
    } else {
        alert("ERRO: ID do usuário não foi encontrado na URL!");
        console.error("URL atual:", window.location.href); // Debug
    }
});

document.getElementById("form-ong").addEventListener('submit', function(event){
    event.preventDefault();
    const id = document.getElementById("usuario_id").value;
    if(!id){
        alert("ERRO: ID do usuário não encontrado!");
        return;
    }
    novo(id);
})


async function novo(id){
    var cnpj =  document.getElementById("ong-cnpj").value;

    // Remover formatação do CNPJ antes de enviar (apenas números)
    cnpj = cnpj.replace(/[^\d]/g, '');

    const fd = new FormData();
    fd.append('cnpj', cnpj);
    fd.append('usuario_id', id);

    const retorno = await fetch("../php/ongNovo.php",  {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();
    
    if(resposta.status == "ok"){
        let usuarioId = resposta.data.usuario_id;
        alert("Sucesso! " + resposta.mensagem);
        window.location.href = '../endereco/enderecoNovo.html?usuario_id=' + usuarioId;
    }else{
        alert("ERRO! " + resposta.mensagem);
    }
}
