document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    var url = new URLSearchParams(window.location.search);
    var id = url.get("id");
    buscarDados(id);

});

async function buscarDados(id){
    const retorno = await fetch("../php/ong_get.php?id="+id);
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert("Sucesso! " + resposta.mensagem);
        var reg = resposta.data[0];
        document.getElementById("ong-id").value = id;
        document.getElementById("ong-cnpj").value = reg.CNPJ;

    }else{
        alert("ERRO! " + resposta.mensagem)
    }
}

document.getElementById('form-ong').addEventListener('submit', function(event){
    event.preventDefault();
    alterar_ong();
});

async function alterar_ong(){
    var id = document.getElementById("ong-id").value;
    var cnpj =  document.getElementById("ong-cnpj").value;

    const ong_alterado = new FormData();
    ong_alterado.append("cnpj", cnpj);
    ong_alterado.append("id", id);

    const retorno = await fetch("../php/ong_alterar.php?id="+id, {
        method: "POST",
        body: ong_alterado
    });
    const resposta = await retorno.json();

    if(resposta.status == "ok"){
        alert("Sucesso! " + resposta.mensagem);
        window.location.href = 'gerenciar_ong.html';
    }else{
        alert("ERRO! " + resposta.mensagem);
    }}