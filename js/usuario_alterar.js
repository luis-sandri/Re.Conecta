document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    var url = new URLSearchParams(window.location.search);
    var id = url.get("id");
    buscarDados(id);
});

async function buscarDados(id){
    const retorno = await fetch("../php/usuario_get.php?id="+id);
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert("Sucesso! " + resposta.mensagem);
        var reg = resposta.data[0];
        document.getElementById("usuario-id").value = id;
        document.getElementById("usuario-nome").value = reg.nome;
        document.getElementById("usuario-email").value = reg.email;
        document.getElementById("usuario-senha").value = reg.senha;
        document.getElementById("usuario-telefone").value = reg.telefone;
        document.getElementById("usuario-role").value = reg.role;

    }else{
        alert("ERRO! " + resposta.mensagem)
    }
}

document.getElementById('form-usuario').addEventListener('submit', function(event){
    event.preventDefault();
    alterar_usuario();
});

async function alterar_usuario(){
    var id = document.getElementById("usuario-id").value;
    var nome = document.getElementById("usuario-nome").value;
    var email = document.getElementById("usuario-email").value;
    var senha = document.getElementById("usuario-senha").value;
    var telefone = document.getElementById("usuario-telefone").value;
    var role = document.getElementById("usuario-role").value;

    const usuario_alterado = new FormData();
    usuario_alterado.append("nome", nome);
    usuario_alterado.append("email", email);
    usuario_alterado.append("senha", senha);
    usuario_alterado.append("telefone", telefone);
    usuario_alterado.append("role", role);
    usuario_alterado.append("id", id);

    const retorno = await fetch("../php/usuario_alterar.php?id="+id, {
        method: "POST",
        body: usuario_alterado
    });
    const resposta = await retorno.json();

    if(resposta.status == "ok"){
        alert("Sucesso! " + resposta.mensagem);
        window.location.href = 'gerenciar_usuario.html';
    }else{
        alert("ERRO! " + resposta.mensagem);
    }
}
