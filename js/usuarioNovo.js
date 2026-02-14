document.addEventListener("DOMContentLoaded", () =>  {
    validaSessao();
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

    const retorno = await fetch("../php/usuarioNovo.php",  {
        method: "POST",
        body: fd
    });
    const resposta = await retorno.json();
    
    if(resposta.status == "ok"){
        let usuarioId = resposta.data.usuario_id;
        let roleUsuario = resposta.data.role;
        
        if(roleUsuario == 'ONG'){
            window.location.href = '../ong/ongNovo.html?usuario_id=' + usuarioId;
        } else if(roleUsuario == 'TECNICO'){
            window.location.href = '../tecnico/tecnicoNovo.html?usuario_id=' + usuarioId;
        } else if(roleUsuario == 'DOADOR'){
            window.location.href = '../doador/doadorNovo.html?usuario_id=' + usuarioId;
        }
    } else if(resposta.status == "not ok"){
        alert("ERRO! " + resposta.mensagem);
    }
}
