document.addEventListener("DOMContentLoaded", () =>  {
    valida_sessao();
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

document.getElementById("form-tecnico").addEventListener('submit', function(event){
    event.preventDefault();
    const id = document.getElementById("usuario_id").value;
    if(!id){
        alert("ERRO: ID do usuário não encontrado!");
        return;
    }
    novo(id);
})

async function novo(id){
    var CPF = document.getElementById("tecnico-CPF").value;
    var tipo_email = document.querySelector('input[name="tipo_email"]:checked').value;
    var data_nasc = document.getElementById("tecnico-data_nasc").value;
    var genero = document.getElementById("tecnico-genero").value;

    const fd = new FormData();
    fd.append('CPF', CPF);
    fd.append('tipo_email', tipo_email);
    fd.append('data_nasc', data_nasc);
    fd.append('genero', genero);
    fd.append('usuario_id', id);

    const retorno = await fetch("../php/tecnico_novo.php",  {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();
    
    if(resposta.status == "ok"){
        let usuarioId = resposta.data.usuario_id;
        alert("Sucesso! " + resposta.mensagem);
        window.location.href = '../endereco/endereco_novo.html?usuario_id=' + usuarioId;
    }else{
        alert("ERRO! " + resposta.mensagem);
    }
}
