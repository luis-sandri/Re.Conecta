document.getElementById("enviar").addEventListener("click", (event) => {
    event.preventDefault();
    consulta();
});

async function consulta(){
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    
    const fd = new FormData();
    fd.append("email", email);
    fd.append("senha", senha);
    
    const retorno = await fetch("../php/usuario_login.php", {
        method: 'POST',
        body: fd
    });

    const resposta = await retorno.json();
    if(resposta.status == "ok"){
        alert("Login realizado com sucesso");
        window.location.href = '../html/home.html';
    }else{
        alert("Falha nas credênciais fornecidas");
    }
}