document.addEventListener("DOMContentLoaded", () => {
    validaSessao();
    carregarDados();
});

document.getElementById("novo").addEventListener("click", () => {
    window.location.href = '../usuario/usuarioNovo.html';
});
document.getElementById("logoff").addEventListener("click", () => {
    logoff();
});

async function logoff(){
    const retorno = await fetch("../php/usuarioLogoff.php");
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        window.location.href = "../login/";
    }else{
        alert("Falha ao efetuar logoff");
    }
}

async function carregarDados(){
    const retorno = await fetch("../php/doadorGet.php");
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        const registros = resposta.data;

        var html = `<table class="table table-striped align-middle">
    <thead>
        <tr>
            <th>ID</th>
            <th>Data Nasc.</th>
            <th>Gênero</th>
            <th>Tipo Documento</th>
            <th>Documento</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>`; 
for(var i=0; i<registros.length; i++){
    var objeto = registros[i];
    html += `<tr>
                <td>${objeto.id}</td>
                <td>${objeto.data_nasc}</td>
                <td>${objeto.genero}</td>
                <td>${objeto.tipo_documento}</td>
                <td>${objeto.documento}</td>
                <td>
                    <a class="btn btn-primary btn-sm me-2" href='doadorAlterar.html?id=${objeto.id}'>Alterar</a>
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
    const retorno = await fetch("../php/doadorExcluir.php?id="+id);
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert(resposta.mensagem);
        window.location.reload();
    }else{
        alert("ERRO: " + resposta.mensagem)
    }
}
