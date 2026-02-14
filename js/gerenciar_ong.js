document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    carregarDados();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = '../usuario/usuario_novo.html';
});
document.getElementById("logoff").addEventListener("click", () => {
    logoff();
});

async function logoff(){
    const retorno = await fetch("../php/usuario_logoff.php");
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        window.location.href = "../login/";
    }else{
        alert("Falha ao efetuar logoff");
    }
}

async function carregarDados(){
    const retorno = await fetch("../php/ong_get.php");
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        const registros = resposta.data;

        var html = `<table class="table table-striped align-middle">
    <thead>
        <tr>
            <th>ID</th>
            <th>CNPJ</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>`; 
for(var i=0; i<registros.length; i++){
    var objeto = registros[i];
    html += `<tr>
                <td>${objeto.id}</td>
                <td>${objeto.CNPJ}</td>
                <td>
                    <a class="btn btn-primary btn-sm me-2" href='ong_alterar.html?id=${objeto.id}'>Alterar</a>
                    <button class="btn btn-danger btn-sm" onclick="excluir(${objeto.id})">Excluir</button>
                </td>
            </tr>`; 
}
html += "</tbody></table>";
document.getElementById("lista").innerHTML = html;

    }else{
        alert("Erro:" + resposta.mensagem);
    }
}

async function excluir(id){
    const retorno = await fetch("../php/ong_excluir.php?id="+id);
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert(resposta.mensagem);
        window.location.reload();
    }else{
        alert("ERRO: " + resposta.mensagem)
    }
}
