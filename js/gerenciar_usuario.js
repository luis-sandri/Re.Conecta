document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    carregarDados();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = 'usuario_novo.html';
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
    const retorno = await fetch("../php/usuario_get.php");
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        const registros = resposta.data;

var html = `<table class="table table-striped align-middle">
    <thead>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th> 
            <th>Role</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>`;
for(var i=0; i<registros.length; i++){
    var objeto = registros[i];
    html += `<tr>
                <td>${objeto.id}</td>
                <td>${objeto.nome}</td>
                <td>${objeto.email}</td>
                <td>${objeto.telefone}</td>
                <td>${objeto.role}</td>
                <td>
                    <a class="btn btn-primary btn-sm me-2" href='usuario_alterar.html?id=${objeto.id}'>Alterar</a>
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
    const retorno = await fetch("../php/usuario_excluir.php?id="+id);
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert(resposta.mensagem);
        window.location.reload(); // Recarregar a tela.
    }else{
        alert("ERRO: " + resposta.mensagem)
    }
}