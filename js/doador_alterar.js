document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    var url = new URLSearchParams(window.location.search);
    var id = url.get("id");
    buscarDados(id);
});

async function buscarDados(id){
    const retorno = await fetch("../php/doador_get.php?id="+id);
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert("Sucesso! " + resposta.mensagem);
        var reg = resposta.data[0];
        document.getElementById("doador-id").value = id;
        document.getElementById("doador-data_nasc").value = reg.data_nasc;
        document.getElementById("doador-genero").value = reg.genero;
        document.getElementById("doador-tipo_documento").value = reg.tipo_documento;
        document.getElementById("doador-documento").value = reg.documento;

    }else{
        alert("ERRO! " + resposta.mensagem)
    }
}

document.getElementById('form-doador').addEventListener('submit', function(event){
    event.preventDefault();
    alterar_doador();
});

async function alterar_doador(){
    var id = document.getElementById("doador-id").value;
    var data_nasc =  document.getElementById("doador-data_nasc").value;
    var genero =  document.getElementById("doador-genero").value;
    var tipo_documento =  document.getElementById("doador-tipo_documento").value;
    var documento =  document.getElementById("doador-documento").value;

    const doador_alterado = new FormData();
    doador_alterado.append("data_nasc", data_nasc);
    doador_alterado.append("genero", genero);
    doador_alterado.append("tipo_documento", tipo_documento);
    doador_alterado.append("documento", documento);
    doador_alterado.append("id", id);

    const retorno = await fetch("../php/doador_alterar.php?id="+id, {
        method: "POST",
        body: doador_alterado
    });
    const resposta = await retorno.json();

    if(resposta.status == "ok"){
        alert("Sucesso! " + resposta.mensagem);
        window.location.href = 'gerenciar_doador.html';
    }else{
        alert("ERRO! " + resposta.mensagem);
    }
}
