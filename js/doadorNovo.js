document.addEventListener("DOMContentLoaded", () =>  {
    validaSessao();
    
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

document.getElementById("form-doador").addEventListener('submit', function(event){
    event.preventDefault();
    const id = document.getElementById("usuario_id").value;
    if(!id){
        alert("ERRO: ID do usuário não encontrado!");
        return;
    }
    novo(id);
})

async function novo(id){
    var data_nasc =  document.getElementById("doador-data_nasc").value;
    var genero =  document.getElementById("doador-genero").value;
    var tipo_documento =  document.getElementById("doador-tipo_documento").value;
    var documento =  document.getElementById("doador-documento").value;

    const fd = new FormData();
    fd.append('data_nasc', data_nasc);
    fd.append('genero', genero);
    fd.append('tipo_documento', tipo_documento);
    fd.append('documento', documento);
    fd.append('usuario_id', id);


    const retorno = await fetch("../php/doadorNovo.php",  {
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
