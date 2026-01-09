const NOME_DO_BANCO = 'reconectaDB';

export function getDB() {
    return JSON.parse(localStorage.getItem(NOME_DO_BANCO));
}

export function saveDB(bancoDeDados) {
    localStorage.setItem(NOME_DO_BANCO, JSON.stringify(bancoDeDados));
}

export function initDB() {
    if (!getDB()) {
        const estruturaInicial = {
            usuarios: [],
            enderecos: [],
            perfis_doador: [],
            perfis_tecnico: [],
            perfis_ong: [],
            nextUsuarioId: 1
        };
        saveDB(estruturaInicial);
        console.log("Banco de dados 'reconectaDB' foi inicializado com sucesso!");
    }
}

// --- FUNÇÕES DE CADASTRO ---

export function cadastrarDoadorfake() {
    const db = getDB();
    if (!db) {
        console.error("O banco de dados não foi inicializado.");
        return false;
    }
    const novoId = db.nextUsuarioId;
    // Novo registro para tabela usuário
    const novoUsuario = new FormData();
    novoUsuario.append("ID", novoId);
    novoUsuario.append("nome", document.getElementById('doador-nome').value);
    novoUsuario.append("email", document.getElementById('doador-email').value);
    novoUsuario.append("senha", document.getElementById('doador-senha').value);
    novoUsuario.append("telefone", document.getElementById('doador-tel').value);
    novoUsuario.append("role", "Doador");
    
    // Novo registro para tabela perfis_doador
    const perfilDoador = new FormData();
    perfilDoador.append("usuario_id", novoId);
    perfilDoador.append("data_nascimento", document.getElementById('doador-nasc').value);
    perfilDoador.append("genero", document.getElementById('doador-genero').value);
    perfilDoador.append("tipo_documento", document.querySelector('input[name="tipo_documento"]:checked').value);
    perfilDoador.append("documento", document.querySelector('input[name="tipo_documento"]:checked').value === 'CPF' ? document.getElementById('doador-cpf').value : document.getElementById('doador-cnpj').value);

    // Novo registro para tabela Endereco
    const novoEndereco = new FormData();
    novoEndereco.append("usuario_id", novoId);
    novoEndereco.append("rua", document.getElementById('doador-rua').value);
    novoEndereco.append("bairro", document.getElementById('doador-bairro').value);
    novoEndereco.append("complemento", document.getElementById('doador-complemento').value);

    db.usuarios.push(novoUsuario);
    db.perfis_doador.push(perfilDoador);
    db.enderecos.push(novoEndereco);
    db.nextUsuarioId++;
    saveDB(db);
    alert("Doador cadastrado com sucesso!");
    console.log("Banco de dados atualizado:", getDB());
    window.location.href = '../html/login.html';
    return true;
}

export function cadastrarTecnicofake() {
    const db = getDB();
    if (!db) {
        console.error("O banco de dados não foi inicializado.");
        return false;
    }
    const novoId = db.nextUsuarioId;

    const tipoEmailSelecionado = document.querySelector('input[name="tipoEmailTecnico"]:checked').value;
    const email = tipoEmailSelecionado === 'pessoal'
        ? document.getElementById('tecnico-email-pessoal').value
        : document.getElementById('tecnico-email-institucional').value;

    // Novo registro para tabela usuário
    const novoUsuario = new FormData();
    novoUsuario.append("ID", novoId);
    novoUsuario.append("nome", document.getElementById('tecnico-nome').value);
    novoUsuario.append("email", email);
    novoUsuario.append("senha", document.getElementById('tecnico-senha').value);
    novoUsuario.append("telefone", document.getElementById('tecnico-tel').value);
    novoUsuario.append("role", "Tecnico");

    // Novo registro para tabela perfis_tecnico
    const perfilTecnico = new FormData();
    perfilTecnico.append("usuario_id", novoId);
    perfilTecnico.append("CPF", document.getElementById('tecnico-cpf').value);
    perfilTecnico.append("tipo_email", tipoEmailSelecionado);
    perfilTecnico.append("data_nascimento", document.getElementById('tecnico-nasc').value);
    perfilTecnico.append("genero", document.getElementById('tecnico-genero').value);

// Novo registro para tabela Endereco
    const novoEndereco = new FormData();
    novoEndereco.append("usuario_id", novoId);
    novoEndereco.append("rua", document.getElementById('tecnico-rua').value);
    novoEndereco.append("bairro", document.getElementById('tecnico-bairro').value);
    novoEndereco.append("complemento", document.getElementById('tecnico-complemento').value);

    db.usuarios.push(novoUsuario);
    db.perfis_tecnico.push(perfilTecnico);
    db.enderecos.push(novoEndereco);
    db.nextUsuarioId++;
    saveDB(db);
    alert("Técnico cadastrado com sucesso!");
    console.log("Banco de dados atualizado:", getDB());
    window.location.href = '../html/login.html';

    return true;
}

export function cadastrarOngfake() {
    const db = getDB();
    if (!db) {
        console.error("O banco de dados não foi inicializado.");
        return false;
    }
    const novoId = db.nextUsuarioId;

    // Novo registro para tabela usuário
    const novoUsuario = new FormData();
    novoUsuario.append("ID", novoId);
    novoUsuario.append("nome", document.getElementById('ong-nome').value);
    novoUsuario.append("email", document.getElementById('ong-email').value);
    novoUsuario.append("senha", document.getElementById('ong-senha').value);
    novoUsuario.append("telefone", document.getElementById('ong-tel').value);
    novoUsuario.append("role", "Ong");

    // Novo registro para tabela perfis_ong
    const perfilOng = new FormData();
    perfilOng.append("usuario_id", novoId);
    perfilOng.append("CNPJ", document.getElementById('ong-cnpj').value);
    
    // Novo registro para tabela Endereco
    const novoEndereco = new FormData();
    novoEndereco.append("usuario_id", novoId);
    novoEndereco.append("rua", document.getElementById('ong-rua').value);
    novoEndereco.append("bairro", document.getElementById('ong-bairro').value);
    novoEndereco.append("complemento", document.getElementById('ong-complemento').value);

    db.usuarios.push(novoUsuario);
    db.perfis_ong.push(perfilOng);
    db.enderecos.push(novoEndereco);
    db.nextUsuarioId++;
    saveDB(db);
    alert("Ong cadastrada com sucesso!");
    console.log("Banco de dados atualizado:", getDB());
    window.location.href = '../html/login.html';

    return true;
}
