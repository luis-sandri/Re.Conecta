document.addEventListener("DOMContentLoaded", () => {
    valida_sessao();
    var url = new URLSearchParams(window.location.search);
    var id = url.get("id");
    buscarDados(id);
});

async function buscarDados(id){
    const retorno = await fetch("../php/tecnico_get.php?id="+id);
    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert("Sucesso! " + resposta.mensagem);
        var reg = resposta.data[0];
        document.getElementById("tecnico-id").value = id;
        document.getElementById("tecnico-CPF").value = reg.CPF;
        if(reg.tipo_email === "pessoal") {
            document.getElementById("tipo_pessoal").checked = true;
        } else {
            document.getElementById("tipo_institucional").checked = true;
        }
        document.getElementById("tecnico-data_nasc").value = reg.data_nasc;
        document.getElementById("tecnico-genero").value = reg.genero;

    }else{
        alert("ERRO! " + resposta.mensagem)
    }
}

document.getElementById('form-tecnico').addEventListener('submit', function(event){
    event.preventDefault();
    alterar_tecnico();
});

async function alterar_tecnico(){
    var id = document.getElementById("tecnico-id").value;
    var CPF = document.getElementById("tecnico-CPF").value;
    var tipo_email = document.querySelector('input[name="tipo_email"]:checked').value;
    var data_nasc = document.getElementById("tecnico-data_nasc").value;
    var genero = document.getElementById("tecnico-genero").value;

    const tecnico_alterado = new FormData();
    tecnico_alterado.append("CPF", CPF);
    tecnico_alterado.append("tipo_email", tipo_email);
    tecnico_alterado.append("data_nasc", data_nasc);
    tecnico_alterado.append("genero", genero);
    tecnico_alterado.append("id", id);

    const retorno = await fetch("../php/tecnico_alterar.php?id="+id, {
        method: "POST",
        body: tecnico_alterado
    });
    const resposta = await retorno.json();

    if(resposta.status == "ok"){
        alert("Sucesso! " + resposta.mensagem);
        window.location.href = 'gerenciar_tecnico.html';
    }else{
        alert("ERRO! " + resposta.mensagem);
    }
}
