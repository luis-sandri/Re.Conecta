document.addEventListener("DOMContentLoaded", () =>  {
    valida_sessao();
});


document.getElementById("form-usuario").addEventListener('submit', function(event){
    event.preventDefault();
    novo();
})


async function novo(){
    var nome =  document.getElementById("usuario-nome").value;
    var email =  document.getElementById("usuario-email").value;
    var senha =  document.getElementById("usuario-senha").value;
    var telefone = document.getElementById("usuario-telefone").value;
    var role =  document.getElementById("usuario-role").value;

    const fd = new FormData();
    fd.append('nome', nome);
    fd.append('email', email);
    fd.append('senha', senha);
    fd.append('telefone', telefone);
    fd.append('role', role);

    const retorno = await fetch("../php/usuario_novo.php",  {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();
    
    if(resposta.status == "ok"){
        let usuarioId = resposta.data.usuario_id;
        let roleUsuario = resposta.data.role;
        
        if(roleUsuario == 'ONG'){
            window.location.href = '../ong/ong_novo.html?usuario_id=' + usuarioId;
        } else if(roleUsuario == 'TECNICO'){
            window.location.href = '../tecnico/tecnico_novo.html?usuario_id=' + usuarioId;
        } else if(roleUsuario == 'DOADOR'){
            window.location.href = '../doador/doador_novo.html?usuario_id=' + usuarioId;
        }
    } else if(resposta.status == "not ok"){
        alert("ERRO! " + resposta.mensagem);
    }
}
