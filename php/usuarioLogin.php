<?php
    include_once('conexao.php');

    $retorno = [
        'status' => '', // ok ou nok
        'mensagem' => '', // mensagem de sucesso ou erro
        'data' => [] // efetivamente o retorno
    ];

    $stmt = $conexao->prepare("SELECT * FROM usuario WHERE email = ? AND senha = MD5(?)");
    $stmt->bind_param("ss", $_POST['email'], $_POST['senha']);
    $stmt->execute(); // executa a query
    $resultado = $stmt->get_result(); // pega o resultado

    $tabela = []; // Array para enviar para o Front
    if($resultado->num_rows > 0) {
        // Criar o laço de repetição para ler o resultado
        // fetch_assoc transforma os atributos do SQL em dicionários
        while($linha = $resultado->fetch_assoc()) {
            $tabela[] = $linha;
        }

        $retorno = [
            'status' => 'ok', // ok ou nok
            'mensagem' => 'Registros encontrados', // mensagem de sucesso ou erro
            'data' => $tabela // efetivamente o retorno
        ];

        // Começando a minha sessão
        session_start();
        $_SESSION['usuario'] = $tabela;
        

    } else {
        $retorno = [
            'status' => 'not ok', // ok ou nok
            'mensagem' => 'Nenhum registro encontrado', // mensagem de sucesso ou erro
            'data' => [] // efetivamente o retorno
        ];
    } // <-- Colchete de fechamento do 'else' que estava faltando

    $stmt->close();
    $conexao->close();

    header("Content-type:application/json;charset:utf-8");
    echo json_encode($retorno);

