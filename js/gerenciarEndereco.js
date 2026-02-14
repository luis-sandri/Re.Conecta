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

async function logoff() {
    const retorno = await fetch("../php/usuarioLogoff.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        window.location.href = "../login/login.html";
    } else {
        alert("Falha ao efetuar logoff");
    }
}

async function carregarDados() {
    const retorno = await fetch("../php/enderecoGet.php");
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        const registros = resposta.data;

        var html = `<table class="table table-striped align-middle">
    <thead>
        <tr>
            <th>ID</th>
            <th>Rua</th>
            <th>Bairro</th>
            <th>Complemento</th>
            <th>Ações</th>
        </tr>
    </thead>
    <tbody>`;
        for (var i = 0; i < registros.length; i++) {
            var objeto = registros[i];
            html += `<tr>
                <td>${objeto.id}</td>
                <td>${objeto.Rua}</td>
                <td>${objeto.Bairro}</td>
                <td>${objeto.Complemento}</td>
                <td>
                    <a class="btn btn-primary btn-sm me-2" href='enderecoAlterar.html?id=${objeto.id}'>Alterar</a>
                    <button class="btn btn-danger btn-sm" onclick="excluir(${objeto.id})">Excluir</button>
                </td>
            </tr>`; 
        }
        html += "</tbody></table>";
        document.getElementById("lista").innerHTML = html;

    } else {
        if (resposta.status === "not ok") {
            document.getElementById("lista").innerHTML = `<p class="text-center">Nenhum endereço cadastrado ainda.</p>`;
        } else {
            alert("Erro: " + resposta.mensagem);
        }
    }
}

async function excluir(id) {
    const retorno = await fetch("../php/enderecoExcluir.php?id=" + id);
    const resposta = await retorno.json();
    if (resposta.status == "ok") {
        alert(resposta.mensagem);
        window.location.reload();
    } else {
        alert("ERRO: " + resposta.mensagem);
    }
}
