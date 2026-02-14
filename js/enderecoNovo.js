document.addEventListener('DOMContentLoaded', () => {
    validaSessao();
});

document.getElementById("form-endereco").addEventListener('submit', function(event){
    event.preventDefault();
    var url = new URLSearchParams(window.location.search);
    var id = url.get("usuario_id");
    cadastrarEnderecos(id);
})


async function cadastrarEnderecos(id) {

    var rua = document.getElementById("rua").value;
    var bairro = document.getElementById("bairro").value;
    var complemento = document.getElementById("complemento").value;


    const fd = new FormData();
    fd.append("rua", rua);
    fd.append("bairro", bairro);
    fd.append("complemento", complemento);
    fd.append("usuario_id", id)



    const retorno = await fetch("../php/enderecoNovo.php", {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
        alert("Sucesso!" + resposta.mensagem);
        window.location.href = '../endereco/gerenciarEndereco.html';
    } else {
        alert("ERRO!" + resposta.mensagem);
    }
}
