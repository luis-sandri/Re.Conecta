// Cadastro de novo usuário tipo doador
document.getElementById('form-doador').addEventListener('submit', (event) => {
    event.preventDefault();
    cadastrarDoador();
});

async function cadastrarDoador(){
    // Novo registro para tabela usuário
    const novoUsuario = new FormData();
    novoUsuario.append("nome", document.getElementById('doador-nome').value);
    novoUsuario.append("email", document.getElementById('doador-email').value);
    novoUsuario.append("senha", document.getElementById('doador-senha').value);
    novoUsuario.append("telefone", document.getElementById('doador-tel').value);
    novoUsuario.append("role", "Doador");
    
    const retorno = await fetch("../php/usuario_novo.php", {
        method: "POST",
        body: novoUsuario
    })
    const resposta = await retorno.json();
    
    if(resposta.status == "ok"){
        alert("Sucesso!" + resposta.mensagem);
        window.location.href = '../login/login.html';        
    }else{
        alert("ERRO!" +resposta.mensagem);
    }
}

// Cadastro de novo usuário tipo tecnico
document.getElementById('form-tecnico').addEventListener('submit', (event) => {
    event.preventDefault();
    cadastrarTecnico();
});

async function cadastrarTecnico(){

    const tipoEmailSelecionado = document.querySelector('input[name="tipoEmailTecnico"]:checked').value;
    const email = tipoEmailSelecionado === 'pessoal'
        ? document.getElementById('tecnico-email-pessoal').value
        : document.getElementById('tecnico-email-institucional').value;

    // Novo registro para tabela usuário
    const novoUsuario = new FormData();
    novoUsuario.append("nome", document.getElementById('tecnico-nome').value);
    novoUsuario.append("email", email);
    novoUsuario.append("senha", document.getElementById('tecnico-senha').value);
    novoUsuario.append("telefone", document.getElementById('tecnico-tel').value);
    novoUsuario.append("role", "tecnico");

    const retorno = await fetch("../php/usuario_novo.php", {
        method: "POST",
        body: novoUsuario
    })
    const resposta = await retorno.json();
    
    if(resposta.status == "ok"){
        alert("Sucesso!" + resposta.mensagem);
        window.location.href = '../login/login.html';        
    }else{
        alert("ERRO!" +resposta.mensagem);
    }    
}

// Cadastro de novo usuário tipo ong
document.getElementById('form-ong').addEventListener('submit', (event) => {
    event.preventDefault();
    cadastrarOng();
});

async function cadastrarOng(){

    // Novo registro para tabela usuário
    const novoUsuario = new FormData();
    novoUsuario.append("nome", document.getElementById('ong-nome').value);
    novoUsuario.append("email", document.getElementById('ong-email').value);
    novoUsuario.append("senha", document.getElementById('ong-senha').value);
    novoUsuario.append("telefone", document.getElementById('ong-tel').value);
    novoUsuario.append("role", "Ong");

    const retorno = await fetch("../php/usuario_novo.php", {
        method: "POST",
        body: novoUsuario
    })
    const resposta = await retorno.json();
    
    if(resposta.status == "ok"){
        alert("Sucesso!" + resposta.mensagem);
        window.location.href = '../login/login.html';        
    }else{
        alert("ERRO!" +resposta.mensagem);
    }       
}