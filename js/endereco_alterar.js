document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    var url = new URLSearchParams(window.location.search);
    var id = url.get("id");
    buscarDados(id);
});

async function buscarDados(id) {
    const retorno = await fetch('../php/endereco_get.php?id=' + id);
    const resposta = await retorno.json();
    if (resposta.status == 'ok') {
        alert("Sucesso! " + resposta.mensagem);
        // reg = registro
        var reg = resposta.data[0];

        document.getElementById("rua").value = reg.Rua;
        document.getElementById("bairro").value = reg.Bairro;
        document.getElementById("complemento").value = reg.Complemento;
        document.getElementById("endereco_id").value = id;


        document.getElementById("criar").style.display = "none";
        document.getElementById("edits").style.display = "block";

    } else {
        alert("ERRO!" + resposta.mensagem)
    }

}

document.getElementById("form-endereco").addEventListener('submit', event => {
    alterar_endereco();
    event.preventDefault();
});

async function alterar_endereco() {
    const endereco_alterado = new FormData();
    var id = document.getElementById("endereco_id").value;
    var rua = document.getElementById("rua").value;
    var bairro = document.getElementById("bairro").value;
    var complemento = document.getElementById("complemento").value;

    endereco_alterado.append('rua', rua);
    endereco_alterado.append('bairro', bairro);
    endereco_alterado.append('complemento', complemento);


    const retorno = await fetch("../php/endereco_alterar.php?id=" + id, {
        method: 'POST',
        body: endereco_alterado
    });
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        alert("Sucesso! " + resposta.mensagem);
        window.location.href = '../endereco/gerenciar_endereco.html';

    } else {
        alert("ERRO! " + resposta.mensagem);
    }
}